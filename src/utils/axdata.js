const axios = require('axios');
const seviceKey = require('../keys/key')

const axdata = async (stationName, callback) => {
  // 공공데이터포털 사이트 > 한국환경공단_에어코리아_대기오염정보
  const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';
  var ServiceKey = serviceKey.publicPortalkey

  var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey;
  queryParams += '&' + encodeURIComponent('numofRows') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
  queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3');
  queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(stationName);
  queryParams += '&' + encodeURIComponent('retrunType') + '=' + encodeURIComponent('json');
  
  const fullurl = url + queryParams;

  try {
    const json = await axios.get(fullurl)
    callback(undefined, {air:json.data})
  } catch(error) {
    console.log('error broke out', error)
  } 
}

module.exports = axdata;
