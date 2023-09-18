const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { LoginValidator } = require('../middlewares/Validator');
AuthController = {};

AuthController.read = (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login');
};

AuthController.login = async (req, res) => {
  const { email, password } = req.body;
  const validator = LoginValidator({ email, password });
  if (validator.error) {
    req.flash('error', validator.error);
    return res.redirect('/');
  }
  const user = await User.findOne({ email: validator.value.email });
  if (!user) {
    req.flash('error', "User doesn't exist with this email account.");
    return res.redirect('/');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    req.flash('error', 'Invalid Password!');
    return res.redirect('/');
  }

  req.session.user = { name: user.name, role: user.role };
  res.locals.user = req.session.user;
  await req.session.save();
  res.redirect('/dashboard');
};

AuthController.logout = (req, res) => {
  req.session.destroy(function () {
    res.redirect('/');
  });
};


AuthController.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'No user with this email address was found.');
      return res.redirect('/forgot-password');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 saat geçerli

    await user.save();

    const transporter = nodemailer.createTransport({

    });

    const mailOptions = {
      from: 'hokmiransoltanli1996@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the link below to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    req.flash('success', 'The password reset link has been sent to your email address.');
    return res.redirect('/forgot-password');
  } catch (error) {
    req.flash('error', 'An error occurred during the password reset request.');
    return res.redirect('/forgot-password');
  }
};


AuthController.resetPasswordPage = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      req.flash('error', 'Invalid or expired reset link.');
      return res.redirect('/forgot-password');
    }

    res.render('reset-password', { token });
  } catch (error) {
    req.flash('error', 'An error occurred during the password reset request.');
    return res.redirect('/forgot-password');
  }
};


AuthController.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      req.flash('error', 'Invalid or expired reset link.');
      return res.redirect('/forgot-password');
    }

    // Yeni parolayı şifreleyin ve kullanıcı hesabına kaydedin
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    req.flash('success', 'Your password has been changed successfully');
    return res.redirect('/login');
  } catch (error) {
    req.flash('error', 'An error occurred during the password reset process.');
    return res.redirect('/forgot-password');
  }
};

module.exports = AuthController;
