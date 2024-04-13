export default class Status {
  static Approved = "approved";
  static Denied = "denied";
  static Pending = "pending";
  static None = null;

  static equals(obj, status) {
    if (typeof obj === "string" || obj instanceof String) {
      return obj == status;
    }
    return false;
  }
}
