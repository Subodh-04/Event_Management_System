const validate = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.body);
    
    if (!result.success) {
      const error = {
        statusCode: 422,
        message: "Invalid input data",
        extraDetails: result.error.errors.map((err) => err.message).join(", "),
      };
      return next(error);
    }

    req.body = result.data;
    next();
  } catch (error) {
    next({
      statusCode: 500,
      message: "Validation error",
      extraDetails: error.message,
    });
  }
};

module.exports = validate;
