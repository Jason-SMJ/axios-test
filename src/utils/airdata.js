const request = require('request');
const serviceKey = require('../keys/key')

const airdata = (stationName, callback) => {
  // 공공데이터포털 사이트 > 한국환경공단_에어코리아_대기오염정보
  const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';
  var ServiceKey = serviceKey.publicPortalkey;

  var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
  queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3');
  queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(stationName);
  queryParams += '&' + encodeURIComponent('retrunType') + '=' + encodeURIComponent('json');
  
  const fullurl = url + queryParams;
  console.log('fullurl ', fullurl);

  request(fullurl, (error, {body}) => {
    console.log('body ', body)
    const air = JSON.parse(body)
    console.log('air '. air)
    callback(undefined, {
      air:air
    })
  })
}

module.exports = airdata;
