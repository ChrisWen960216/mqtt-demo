const RequestFilter = require('../common/filter');
const TemperatureService = require('../service/temperature');
const ResponseExtend = require('../extend/response');
const TYPE = require('../common/type');

// async function tempController(request, response) {
//   const params = new RequestFilter(request).getParams();
//   const tempData = await new TemperatureService(params).getData();
//   let resData = {};
//   switch (tempData.type) {
//     // let resDaata = {};
//     case 'OPS_SUCCESS':
//       resData = ResponseExtend.createResponseData(TYPE[tempData.type], '操作成功', tempData.data);
//       return response.json(resData);
//     case 'OPS_FAILURE':
//     case 'TIME_OUT':
//       resData = ResponseExtend.createErrorMsg(TYPE[tempData.type], tempData.type);
//       return response.json(resData);
//     default:
//       return false;
//   }
// }

class TempController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async responseData() {
    const { request, response } = this;
    const params = new RequestFilter(request).getParams();
    const tempData = await new TemperatureService(params).getData();
    let resData = {};
    switch (tempData.type) {
    // let resDaata = {};
      case 'OPS_SUCCESS':
        resData = ResponseExtend.createResponseData(TYPE[tempData.type], '操作成功', tempData.data);
        return response.json(resData);
      case 'OPS_FAILURE':
      case 'TIME_OUT':
        resData = ResponseExtend.createErrorMsg(TYPE[tempData.type], tempData.type);
        return response.json(resData);
      default:
        return response.json(resData);
    }
  }
}

module.exports = TempController;
