class RequestFilter {
  constructor(request) {
    this.request = request;
  }

  getParams() {
    const { deviceId } = this.request.params;
    return deviceId;
  }
}

module.exports = RequestFilter;
