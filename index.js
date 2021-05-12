const { URL } = require('url');
const got = require('got')
const cheerio = require('cheerio')
const converter = require('json2csv');
fs = require('fs');

//import data from "./target.json"


const targetURL = [
  "https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1"
]

let result = [];

const crawler = async () => {
  for ( const url of targetURL ){
    const { body } = await got(url)
    const $ = cheerio.load(body, null, false)
    const header1 = $("h1").map((i, section) => {
      return $(section).text()
    });
    title = header1.get(0);
    headers = header1
    const temp = {
      "title": title,
      "url": url,
      "headers": headers
    }
    result.splice(0,0, temp)
    fs.writeFile("hello", body, (err) => {
      if (err) return console.log(err);
    });

  }
}

crawler()


