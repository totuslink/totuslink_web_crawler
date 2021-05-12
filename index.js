const { URL } = require('url');
const got = require('got')
const cheerio = require('cheerio')
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

    const description = $("meta[name='descript']")

    const title = header1.get(0);
    
    headers = header1
    const temp = {
      "title": title,
      "url": url,
      "description":description,
      "headers": headers
    }
    result.splice(0,0, temp)

  }
}


crawler()


