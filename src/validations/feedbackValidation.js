const feedbackValidation = (feedback) => {
  let errors = {
    questionErrors: [],
    descriptionErrors: [],
  };

  if (!feedback.title) {
    errors.titleError = 'Title is required ';
  }

  if (!feedback.expire_date) {
    errors.expiredateError = 'Expire date is required';
  }

  if (feedback.expire_date) {
    let parts = feedback.expire_date.split('-');
    let expire_date = new Date(parts[0], parts[1] - 1, parts[2]);
    let today = new Date();
    if (expire_date <= today) {
      errors.expiredateError =
        'Expire date should be greater than current date';
    }
  }

  feedback.questions.map((question, index) => {
    if (!question.question) {
      errors.questionErrors[index] = 'Question Shouldnt be Empty!';
    }
    if (!question.description) {
      errors.descriptionErrors[index] = 'Description Shouldnt be Empty!';
    }
  });

  return errors;
};

export default feedbackValidation;
