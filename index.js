var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
//Script is much faster with this field set to false
// page.settings.loadImages = false;
page.onConsoleMessage = function(msg) {
  console.log(msg);
}

var url = 'https://aliexpress.com/';
var testindex = 0;
var loadInProgress = false;
var product_id = '32544859436';

var steps = [
  function() {
    console.log('Step 1. Open AliExpress Website')
    page.open(url, function(status) {
      if (status !== 'success') {
        console.log('ERROR loading page: ' + url)
      } else {
        console.log('success loading page: ' + url)
      }
    })
  },
  function() {
    var productID = product_id
    console.log('Step 2. Input Search Bar with Product ID')
    page.evaluate(function(productID) {
      console.log('masuk evaluate dengan productID: ' + productID)
      document.getElementById('search-key').value = productID;
      document.querySelector('.header .searchbar-form .search-button').click();
    }, productID)
  },
  // function() {
  //   console.log('Step 3. Click Search Button')
  //   page.evaluate(function() {
  //     document.querySelector('.header .searchbar-form .search-button').click();
  //   })
  // },
  function() {
    console.log('Step 3.5 . Render Current Page')
    page.render('aliexpress-'+String(testindex+1)+'.png')
    // testindex++
    // executeRequestsStepByStep()
  }
  // function() {
  //   console.log('Step 4. Scrapping Data Start!')
  //   var fs = require('fs');
	// 	var result = page.evaluate(function() {
  //     return document.querySelectorAll("html")[0].outerHTML;
	// 	});
  //   fs.write('aliexpressHasilSearch.html',result,'w');
  // }
]

var executeRequestsStepByStep = function(){
  setTimeout(function() {
    if (testindex < steps.length) {
      steps[testindex]();
      testindex++
    } else {
      console.log("Scrapping Complete!");
      phantom.exit();
    }
  }, 1000)
    // if (loadInProgress == false && typeof steps[testindex] == "function") {
    //     setTimeout(function() {
    //       if (testindex < steps.length) {
    //         steps[testindex]();
    //       } else {
    //         console.log("Scrapping Complete!");
    //         phantom.exit();
    //       }
    //     }, 1000)
    // }
    // if (typeof steps[testindex] != "function") {
    //     console.log("Scrapping Complete!");
    //     phantom.exit();
    // }
}

page.onLoadStarted = function() {
    console.log("testindex " + (testindex-1));
    console.log("Step " + (testindex));
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
  loadInProgress = false;
  console.log('Loading finished');
  executeRequestsStepByStep()
};

executeRequestsStepByStep()
