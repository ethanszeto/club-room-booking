import Errors from "./errors.js";

const handleError = (res, error) => {
  res.clearCookie("error");
  switch (error) {
    case Errors[400].BadRequest:
      res.send({ error: "Bad Request" });
      break;
    case Errors[401].Unauthorized:
      // no login
      //res.send({ error: "Please log in to access that page." });
      res.redirect("/user/login");
      break;
    case Errors[401].LoginFailed:
      res.send({ error: "Failed to login in with the given credentials." });
      break;
    case Errors[403].Forbidden:
      res.send({ error: "You do not have permission to access this page." });
      break;
    case Errors[500].InternalServerError:
      res.send({ error: "Internal server error." });
      break;
    case Errors[500].MySQLConnectionError:
      res.send({ error: "Unable to connect to local mySQL instance." });
      break;
    default:
      res.redirect("/");
      break;
  }
};

export default handleError;
