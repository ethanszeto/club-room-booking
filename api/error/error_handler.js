import Errors from "./errors.js";

const handleError = (res, error) => {
  res.clearCookie("error");
  switch (error) {
    case Errors[400].BadRequest:
      res.status(100).json({ error: "Bad Request" });
      break;
    case Errors[401].Unauthorized:
      res.status(401).json({ error: "Please log in to access that page." });
      break;
    case Errors[403].Forbidden:
      res.status(403).json({ error: "You do not have permission to access this page." });
      break;
    default:
      res.redirect("/");
      break;
  }
};

export default handleError;
