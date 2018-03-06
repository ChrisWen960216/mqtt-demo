class ResponseExtend {
  constructor(type, msg, data) {
    this.type = type;
    this.msg = msg;
    this.payload = data;
  }

  static createErrorMsg(errType, msg) {
    return new ResponseExtend(errType, msg, null);
  }

  static createSuccessMsg(successType, msg) {
    return new ResponseExtend(successType, msg, null);
  }

  static createResponseData(successType, msg, data) {
    return new ResponseExtend(successType, msg, data);
  }

  // static crea
}

module.exports = ResponseExtend;
