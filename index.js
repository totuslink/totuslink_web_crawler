const { URL } = require('url');
const got = require('got')
const cheerio = require('cheerio')
fs = require('fs');
const jsonexport = require('jsonexport');


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

    let links = []

    const link = $("a").map((i, section) => {
      try {
        const url = new URL(section.attribs.href);
        links.splice(0, 0, url.href)
      } catch(err){
        return;
      }
    })

    const description = $("meta[name='description']").attr("content")
    const author = $("meta[name='author']").attr("content")
    const read_time = $("meta[name='twitter:data1']").attr("content")
  
    const title = header1.get(0);
    delete header1[0];
    let headers = [];
    
    for ( const [key, value] of Object.entries(header1)){
      if (typeof(value) === "string"){
        headers.splice(0, 0, value)
      }
    } 

    const temp = {
      "title": title,
      "url": url,
      "description":description,
      "headers": headers,
      "author": author,
      "read_time": read_time,
      "links": links
    }
    result.splice(0,0, temp)

    console.log(result)

    //jsonexport(result, function(err, csv){
    //  if (err) return console.error(err);
    //  console.log(csv);
    //});
  }
}


crawler()


