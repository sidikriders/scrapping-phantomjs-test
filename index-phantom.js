var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
//Script is much faster with this field set to false
page.settings.loadImages = false;
page.onConsoleMessage = function(msg) {
  console.log(msg);
}
var url = 'https://www.aliexpress.com/';
var testindex = 0;
var loadInProgress = false;
var product_id = '32544859436';
// var product_id = '32604474505';
var result = {};

var arrGambar = [];
var categories = [];

var steps = [
  function() {
    console.log('Step 1. Open AliExpress Website')
    page.open(url, function(status) {

      if (status !== 'success') {
        console.log('ERROR loading page: ' + url)
      } else {
        console.log('success loading page: ' + url)
        result.status = status;
      }
    })
  },
  // function() {
  //   console.log('Step 1.5. Include JQuery in html')
  //   page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
  //   });
  // },
  function() {
    var productID = product_id;
    result.date_and_time = new Date().toUTCString()
    result.product = {};
    result.product.id = productID;
    console.log('Step 2. Input Search Bar with Product ID')
    setTimeout(function() {
      page.evaluate(function(productID) {
        console.log('masuk evaluate dengan productID: ' + productID);
        document.getElementById('search-key').value = productID;
        console.log('click search kuy! GoGoGoGO!')
        document.querySelector('.header .searchbar-form .search-button').click();
      }, productID)
    }, 500);
  },
  // function() {
  //   console.log('Step 3. Click Search Button')
  //   setTimeout(function() {
  //     page.evaluate(function() {
  //       document.querySelector('.header .searchbar-form .search-button').click()
  //     })
  //   }, 500);
  // },
  function() {
    console.log('Step 3.5. Render Current Page')
    setTimeout(function() {
      page.render('aliexpress-'+String(testindex+1)+'.png')
      // testindex++
      // executeRequestsStepByStep()
      result.url = page.url
      console.log("++++URL++++ " + page.url)
      console.log('mau console log result')
      console.log(JSON.stringify(result))
      // executeRequestsStepByStep(3)
    }, 1500)
  }
  // function() {
  //   console.log('Scrapping Data Start!')
  //   setTimeout(function() {
  //     arrGambar = page.evaluate(function() {
  //       return document.querySelectorAll('.image-thumb-list .img-thumb-item img')
  //     })
  //     setTimeout(function() {
  //       executeRequestsStepByStep()
  //     }, 5000)
  //   }, 500)
  // },
  // function() {
  //   setTimeout(function() {
  //     console.log('=======set product.images')
  //     var imagesNya = []
  //     for (var i = 0; i<arrGambar.length; i++) {
  //       console.log('i === ' + i)
  //       if (typeof arrGambar[i] === 'object') {
  //         console.log('arrGambar[i].src === ' + arrGambar[i].src)
  //       } else {
  //         console.log("arrGambar[i].src doesn't valid")
  //       }
  //       // imagesNya.push(arrGambar[i].src)
  //     }
  //     setTimeout(function() {
  //       result.product.images = imagesNya
  //       categories = page.evaluate(function() {
  //         return document.querySelectorAll('.ui-breadcrumb a')
  //       })
  //     }, 500)
  //   }, 500)
  // },
  // function() {
  //   console.log('=======set product.categories')
  //   var realCategories = categories.slice(2, categories.length)
  //   result.categories = []
  //   for (var i = 0; i < realCategories.length; i++) {
  //     result.categories.push(realCategories[i].innertext)
  //   }
  //   setTimeout(function() {
  //     executeRequestsStepByStep()
  //   }, 1500)
  // },
]

var executeRequestsStepByStep = function(){
  setTimeout(function() {
    if (testindex < steps.length && loadInProgress == false) {
      steps[testindex]();
      testindex++
    } else if (testindex >= steps.length) {
      console.log("Scrapping Complete!");
      phantom.exit();
    } else {
      console.log('NYASAR!!')
    }
  }, 1000)
}

page.onLoadStarted = function() {
  // console.log("Step " + (testindex));
  loadInProgress = true;
  console.log('-----Loading started');
};
page.onLoadFinished = function() {
  loadInProgress = false;
  console.log('-----Loading finished');
  executeRequestsStepByStep()
};
// page.onUrlChanged = function(targetUrl) {
//   page.render('aliexpress-'+String(testindex+1)+'.png')
//   console.log('New URL: ' + targetUrl);
//   phantom.exit()
// };

executeRequestsStepByStep()
