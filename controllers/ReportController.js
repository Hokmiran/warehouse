const Product = require('../models/Product');
const Customer = require("../models/Customer")
const Report = require("../models/Report");
const { ReportValidator } = require('../middlewares/Validator');

const ReportController = {};

ReportController.create = async (req, res) => {
  const { employeeID, productCode, report } = req.body;
  const validator = ReportValidator({ employeeID, productCode, report });
  if (validator.error) {
    req.flash('error', validator.error);
    return res.redirect('/reports');
  }

  try {
    const { employeeID, productCode, report } = validator.value;
    const DBproduct = await Product.findOne({ code: productCode });
    const DBreporter = await Customer.findOne({ phone: employeeID });
    const savedReport = await new Report({ reporter: DBreporter._id, product: DBproduct._id, report }).save();
    req.flash(
      'success',
      `Report by ${DBreporter.name} for ${DBproduct.name}  has been successfully submitted!`
    );
    return res.redirect('/reports');
  } catch (e) {
    req.flash('error', `Error While Saving Data - ${e}`);
    return res.redirect('/reports');
  }
};

ReportController.read = async (req, res) => {
  const perPage = 30;
  const page = req.params.page || 1;
  let reports = Report.find({});
  let count = await Report.countDocuments();

  let queryString = {},
    countDocs;
  let matchObj = {
    code: { $regex: req.query.searchQuery, $options: 'i' },
  };

  if (req.query.searchQuery) {
    reports = Report.aggregate().match(matchObj);
    countDocs = Report.aggregate().match(matchObj);
    queryString.query = req.query.searchQuery;
  }
  if (countDocs) {
    countDocs = await countDocs.exec();
    count = countDocs.length;
  }

  reports = await reports
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ createdAt: -1 })
    .populate('reporter', 'name')
    .populate('product', 'code')
    .exec();
  res.render('reports/index', {
    reports,
    queryString,
    current: page,
    pages: Math.ceil(count / perPage),
  });
};

ReportController.update = async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  req.flash(
    'success',
    `Report (${product.name}) has been updated successfully!`
  );
  res.redirect('/reports');
};

ReportController.delete = async (req, res) => {
  const report = await Report.findByIdAndDelete(req.params.id);
  req.flash(
    'success',
    `Report (${product.name}) has been deleted successfully!`
  );
  res.redirect('/reports');
};

// API
ReportController.getReports = async (req, res) => {
  const reports = await Report.find({});
  res.send(reports);
};

ReportController.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (report) return res.send(report);
    return res.send("Report Doesn't Exist");
  } catch (e) {
    return '';
  }
};

module.exports = ReportController;
