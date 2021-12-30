const express = require('express');
const path = require('path');
const hbs = require('hbs');

const bodyParser = require('body-parser');
// const airdata = require('./src/utils/airdata');
const axdata = require('./src/utils/axdata');

const app = express();
// app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 8000;

const publicDir = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('/', (req, res)=> {
  res.render('index', {
    제목 : '오늘의 날씨',
    위치 : '서울',
    미세먼지 : '좋음',
    출처 : '기상청',
    email : 'myapplesmj@@gmail.com'
  })
})

app.get('/about', (req, res)=> {
  res.render('about', {
    제목 : '오늘의 날씨',
    위치 : '서울',
    미세먼지 : '좋음',
    출처 : '기상청',
    email : 'myapplesmj@@gmail.com'
  })
})

app.get('/help', (req, res)=> {
  res.render('help', {
    제목 : '오늘의 날씨',
    위치 : '서울',
    미세먼지 : '좋음',
    출처 : '기상청',
    email : 'myapplesmj@@gmail.com'
  })
})

app.post('/air', (req, res) => {
  axdata(req.body.location, (error, {air}={}) => {
    if (error) {
      return res.send({error})
    }

    return res.render('air', {
      제목 : '오늘의 날씨',
      이름 : '김광철',
      이메일 : 'kk@kk',
      location: air['parm']['stationNmae'],
      time: air['list'][0]['dataTime'],
      pm10: air['list'][0]['pm10Value'],
      pm25: air['list'][0]['pm25Value'],
    })
  })
})

app.get('/weather', (req, res) => {
  res.send({
    name:"SMJ",
    주소:"신도림"
  })
})

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
})

