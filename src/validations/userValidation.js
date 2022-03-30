const userValidation = (user) => {
  let errors = {};

  console.log('user validation is called');

  var regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  if (!user.email && !user.password) {
    errors.userEmptyError = 'Email and Password is required!';
  }

  if (
    !user.email &&
    !user.password &&
    !user.password_confirmation &&
    !user.name
  ) {
    errors.registerEmptyError = 'All Register details cant be empty!';
  }

  if (!user.email.includes('@')) {
    errors.emailError = 'Email is invalid';
  }

  if (!regex.test(user.password)) {
    errors.passwordError = 'Password is invalid';
  }

  if (!user.email) {
    errors.emailError = 'Email is required';
  }

  if (!user.password) {
    errors.passwordError = 'Password is required';
  }

  if (!user.name) {
    errors.nameError = 'Username is required';
  }

  if (user.password !== user.password_confirmation) {
    errors.confirmPasswordError = 'Password doesnt match';
  }

  if (!regex.test(user.password_confirmation)) {
    errors.confirmPasswordError = 'Password is invalid';
  }

  if (!user.password_confirmation) {
    errors.confirmPasswordError = 'Confirm Password Required';
  }

  return errors;
};

export default userValidation;
