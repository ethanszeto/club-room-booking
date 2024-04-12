const Errors = {
  400: {
    BadRequest: "Bad Request",
  },
  401: {
    Unauthorized: "Unauthorized",
    LoginFailed: "Failed to login in with the given credentials",
  },
  403: {
    Forbidden: "Forbidden",
  },
  418: {
    Teapot: "I'm a teapot",
  },
  500: {
    InternalServerError: "Internal Server Error",
    MySQLConnectionError: "Unable to connect to local mySQL instance",
  },
};

export default Errors;
