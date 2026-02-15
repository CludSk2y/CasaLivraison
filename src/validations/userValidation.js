const validateRegister = (data) => {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Email format is invalid";
  }

  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.email || String(data.email).trim() === "") {
    errors.email = "Email is required";
  }
  if (!data.password || String(data.password).trim() === "") {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = { validateRegister, validateLogin };
