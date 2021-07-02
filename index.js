const { URL } = require('url');
const got = require('got')
const cheerio = require('cheerio')
fs = require('fs');
const jsonexport = require('jsonexport');


//import data from "./target.json"

/*
const targetURL = [
  "https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1",
  "https://tengyuanchang.medium.com/%E7%AD%86%E8%A8%98-facebook-%E8%B3%87%E6%B7%B1%E7%94%A2%E5%93%81%E7%B6%93%E7%90%86%E8%81%8A%E8%81%8A%E7%94%A2%E5%93%81%E8%88%87%E5%89%B5%E6%96%B0-f4407c978fa",
  "https://whizzoe.medium.com/no-code-prototypes-to-validate-ideas-get-paying-customers-57037cacce88",
  "https://shimont.medium.com/switching-top-down-sales-to-bottom-up-product-led-growth-30be52f7dba7",
  "https://javascript.plainenglish.io/how-to-build-a-doctor-booking-app-for-healthcare-appointments-with-react-native-c3ddf4bb40af",
  "https://medium.com/positiveslope/8-themes-for-the-near-future-of-tech-410dbb0b1afb",
  "https://medium.com/firebase-developers/the-comprehensive-guide-to-github-actions-and-firebase-hosting-818502d86c31",
  "https://medium.com/@alpacavc/a-founders-guide-on-how-to-announce-a-funding-round-a0dd76cc2dda",
  "https://alexmc.medium.com/apps-i-cant-live-without-v2021-127bfcaf374f",
  "https://bretwaters.medium.com/the-most-important-startup-advice-ever-47a8b0955e78",
  "https://medium.com/@astromnhsu/%E6%88%91%E5%80%91%E9%9C%80%E8%A6%81%E5%8F%B0%E7%81%A3%E9%8F%88%E5%97%8E-%E5%B0%88%E8%A8%AA-amis-%E9%A6%96%E5%B8%AD%E7%A7%91%E5%AD%B8%E5%AE%B6-%E6%94%BF%E5%A4%A7%E5%8A%A9%E7%90%86%E6%95%99%E6%8E%88%E9%99%B3%E6%98%B6%E5%90%BE-af02b1173d45",
  "https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/apple-%E5%AE%98%E6%96%B9%E7%9A%84-swift-ios-app-%E7%AF%84%E4%BE%8B-d54ed854a5ad",
  "https://medium.com/antlerglobal/books-that-every-entrepreneur-should-read-in-2021-aedcb0071a2e",
  "https://axk51013.medium.com/google%E6%96%B0%E9%87%8B%E5%87%BA%E4%B8%89%E5%A0%82%E7%B7%9A%E4%B8%8A%E8%AA%B2%E7%A8%8B-pm-ux-%E8%B3%87%E6%96%99%E5%88%86%E6%9E%90-229940fcf211",
  "https://malisauskas.medium.com/from-zero-to-1000-mrr-in-4-months-how-i-created-a-shopify-app-microsaas-b84cf72e24f5",
  "https://medium.com/upside-partnership/fundraising-commandments-f00275b4d038",
  "https://bretwaters.medium.com/entrepreneurs-avoid-my-startup-fundraising-mistakes-5be23f859b4c",
  "https://blossomstreetventures.medium.com/stop-giving-shares-to-advisors-6ddeabbb3f4d",
  "https://medium.com/wharton-fintech/y-combinators-michael-seibel-dalton-caldwell-lessons-from-5000-entrepreneurs-be77ba6a6970",
  "https://medium.com/linear-app/linear-raises-13m-in-series-a-funding-from-sequoia-capital-daa0f0c43758",
  "https://medium.com/pinata/how-to-build-erc-721-nfts-with-ipfs-e76a21d8f914",
  "https://medium.com/pixelme-blog/in-2020-we-bought-out-our-investors-shares-we-gave-back-200k-from-a-loan-and-i-finally-bought-88cc8a610e28",
];
*/

const targetURL = [
  "https://www.nitori-net.tw/Goods/ItemLabelList.aspx?LabelId=119"
];


( async function(){
  let result = [];
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

    console.log(temp)

    result.splice(0,0, temp)
  }
  result_string = JSON.stringify(result);
  fs.writeFile("result.json", result_string, (err) => {
    if (err) return console.log(err);
  });
}())







/*


*/