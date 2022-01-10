const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username").not().isEmpty().trim().withMessage("All Fields Required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  //can add many more checks
];

exports.signinValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  console.log(`Result: ${result}`);
  console.log(`hasError: ${hasErrors}`);

  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ errorServerMsg: firstError });
  }
  next();
};
