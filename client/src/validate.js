const validate = (errors, registerValidationDetails, data) => {
  let isError = false;

  registerValidationDetails(data).forEach(validate => {
    if (validate.condition) {
      isError = true;
      errors[validate.nameOfErrorProperty] = validate.messageError;
    } else {
      errors[validate.nameOfErrorProperty] = "";
    }
  });

  return {
    isError,
    errors
  };
};

export default validate;
