const cheerio = require('cheerio');
const request = require('request');
// const jsonframe = require('jsonframe');
// baju
var url = "https://www.aliexpress.com/item/Blusas-Mujer-De-Moda-2017-Summer-Fashion-Back-Lace-Women-Tunic-Blouses-Short-Sleeve-Harajuku-Tee/32814580334.html"
// charger
// var url = 'https://www.aliexpress.com/item/BlitzWolf-EU-Qualcomm-Certified-Quick-Charge-3-0-18W-Micro-USB-Charger-USB-Adapter-with-Power3S/32604474505.html'
// minion
// var url = "https://www.aliexpress.com/item/kids-toys-1-pc-20cm-high-Minions-Plush-animal-toy-Depicable-Me-Movie-Minions-small-pendant/32544859436.html"
var $;
var result = {}

request(url, function(error, response, html) {
  if (!error && response.statusCode == 200) {
    // console.log(html);
    $ = cheerio.load(html)
    result.status_code = response.statusCode;
    result.error_message = "";
    result.date_and_time = new Date().toUTCString();
    result.product = {};
    result.product.id = "32544859436";
    $('.product-name').each( (x, element) => {
      result.product.name = element.children[0].data
    })
    result.product.categories = []
    $('.ui-breadcrumb a').each( (x, element) => {
      if (element.attribs.title) {
        result.product.categories.push({
          seems_like_id: element.attribs.href.split('/')[4],
          url: element.attribs.href,
          title: element.attribs.title
        })
      }
    })
    result.product.images = []
    $('.image-thumb-list .img-thumb-item img').each( (x, element) => {
      result.product.images.push(element.attribs.src.split('_')[0])
    })
    result.product.ratings = {}
    $('.product-star-order .percent-num').each( (x, el) => {
      result.product.ratings.score = el.children[0].data
    })
    $('.product-star-order .rantings-num').each( (x, el) => {
      result.product.ratings.number_of_votes = el.children[0].data.split(" ")[0].split("").splice(1, el.children[0].data.split(" ")[0].split("").length).join("")
    })
    result.product.variants = []
    $('#j-product-info-sku .p-property-item').each( (x, el) => {
      var someVariant = {}
      someVariant.name = el.children[1].children[0].data.split("").splice(0,(el.children[1].children[0].data.length-1)).join("")
      someVariant.options = []
      el.children[3].children[1].children.forEach( c => {
        if (c.name == 'li') {
          if (c.children[0].children[0].name == 'span') {
            someVariant.options.push(c.children[0].children[0].children[0].data);
          } else if (c.children[0].children[0].name == 'img') {
            someVariant.options.push(c.children[0].children[0].attribs.src.split("_")[0])
          }
        }
      })
      // result.product.variants.push(someVariant)
      result.product.variants.push(JSON.stringify(someVariant))
    })
    $('.product-star-order .order-num').each( (x, el) => {
      result.product.number_of_order = el.children[0].data.split(" ")[0]
    })
    // $('#j-sell-stock-num').each( (x, el) => {
    //   console.log(el);
    // })
    result.product.number_of_pieces_available = "sepertinya tidak bisa di cheerio"
    // $('#j-wishlist-num').each( (x, el) => {
    //   console.log(el)
    // })
    result.product.number_of_added_wishlist = "mesti pake phantomJS sepertinya"
    result.product.shipping = {}
    result.product.shipping.weight = "skip_dulu"
    result.product.shipping.methods = [{data: "skip-dulu"}]
    result.store = {}
    $('.store-intro dd.store-name a').each( (x, el) => {
      result.store.id = el.attribs.href.split("/")[4];
      result.store.name = el.attribs.title
    })
    $('.store-intro dd.store-address').each( (x, el) => {
      result.store.location = el.children[0].data.split("\t").join('').split('\n').join('')
    })
    $('.seller-score-feedback').each( (x, el) => {
      console.log(el)
    })
    $('.store-open-time span').each( (x, el) => {
      result.store.open_since = el.children[0].data
    })

  }
  console.log(result)
})
