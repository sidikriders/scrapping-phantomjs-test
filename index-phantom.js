var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

var url = 'https://www.aliexpress.com/';
var testindex = 0;
var loadInProgress = false;
var product_id = '32544859436';
// var product_id = '32604474505';
var result = {};

var steps = [
  function() {
    console.log('Step 1. Open AliExpress Website')
    page.open(url, function(status) {if (status !== 'success') {
        console.log('ERROR loading page: ' + url)
      } else {
        console.log('success loading page: ' + url)
        result.status = status;
      }
    })
  },
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
      result.url = page.url
      console.log("++++URL++++ " + page.url)
      loadInProgress = false;
      executeRequestsStepByStep()
    }, 1500)
  }
]

var executeRequestsStepByStep = function(){
  setTimeout(function() {
    if (testindex < steps.length && loadInProgress == false) {
      steps[testindex]();
      testindex++
    } else if (testindex >= steps.length) {
      console.log(JSON.stringify(result, null, 2));
      console.log("Scrapping Complete!");
      phantom.exit();
    } else {
      console.log('NYASAR!!')
      executeRequestsStepByStep()
    }
  }, 1000)
}

page.onLoadStarted = function() {
  // console.log("Step " + (testindex));
  loadInProgress = true;
  console.log('-----Loading started');
};
page.onLoadFinished = function() {
  loadInProgress = false
  console.log('-----Loading finished');
  executeRequestsStepByStep()
};

executeRequestsStepByStep()
