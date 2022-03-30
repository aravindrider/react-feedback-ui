const answerValidation = (answers) => {
  let errors = {};

  if (!(Object.keys(answers).length === 0 && answers.constructor === Object)) {
    errors.answerEmptyError = 'All Questions Cant be Empty!';
  }

  return errors;
};

export default answerValidation;
