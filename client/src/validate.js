const validate = (errors, ValidationDetails, data) => {
  console.log(errors);
  let isError = false;

  ValidationDetails(data).forEach((validate, id) => {
    if (validate.condition) {
      isError = true;
      errors[validate.nameOfErrorProperty] = validate.messageError;
    } else if (
      !validate.condition &&
      validate.messageError === errors[validate.nameOfErrorProperty]
    ) {
      errors[validate.nameOfErrorProperty] = "";
    }
  });

  return {
    isError,
    errors
  };
};

export default validate;
