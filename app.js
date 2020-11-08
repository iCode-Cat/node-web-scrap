const express = require('express');
const rp = require('request-promise');
const puppeteer = require('puppeteer');

const bodyParser = require('body-parser');
const $ = require('cheerio');
const app = express();

let array = [];

app.set('view engine' , 'ejs')
app.use(bodyParser.json());
app.get('/', (req, res) => {
    const url = 'https://www.footyrenders.com/?s=arsenal';
    rp(url)
    .then(function(html){
      //success!
      console.log($('main > div > article > ul > li > div > a > img', html)[0].attribs['data-src'])

      for (let i = 0; i < 20; i++) {
        players = $('main > div > article > ul > li > div > a > img', html)[i].attribs['data-src'];
        array.push(players)
      }
      console.log(array);
      res.render('index', {array})
    })
    .catch(function(err){
      //handle error
    });
})

app.post('/', (req, res)=>{
    console.log(req.body);
})

app.listen(3000);