const Department = require('../models/Department');
const { DepartmentValidator } = require('../middlewares/Validator');

const DepartmentController = {};

DepartmentController.create = async (req, res) => {
  const { name } = req.body;
  const validator = DepartmentValidator({ name }); // Assuming you have a DepartmentValidator middleware
  if (validator.error) {
    req.flash('error', validator.error);
    console.log(req.body);
    return res.redirect('/departments');
  }

  try {
    const { name } = validator.value;
    const department = await new Department({ name }).save();
    req.flash('success', `Department ${department.name} has been successfully created!`);
    return res.redirect('/departments');
  } catch (e) {
    req.flash('error', `Error While Saving Data - ${e}`);
    return res.redirect('/departments');
  }
};

DepartmentController.read = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.render('departments/index', { departments });
  } catch (e) {
    req.flash('error', `Error While Retrieving Data - ${e}`);
    return res.redirect('/departments');
  }
};

DepartmentController.update = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    req.flash(`Department ${department.name} has been updated successfully!`);
    res.redirect('/departments');
  } catch (e) {
    req.flash('error', `Error While Updating Data - ${e}`);
    return res.redirect('/departments');
  }
};

DepartmentController.delete = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    req.flash(`Department ${department.name} has been deleted successfully!`);
    res.redirect('/departments');
  } catch (e) {
    req.flash('error', `Error While Deleting Data - ${e}`);
    return res.redirect('/departments');
  }
};

// API
DepartmentController.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.send(departments);
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

DepartmentController.getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department) return res.send(department);
    return res.status(404).send({ error: 'Department Not Found' });
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = DepartmentController;
