var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
page.onConsoleMessage = function(msg) {
  console.log(msg);
}

var url = 'https://aliexpress.com/';
// var url = 'https://google.com/';
const productId = '32544859436';
var clicked = false;

var searchGoGo = function() {
  setTimeout(function() {
    page.evaluate(function() {
      document.querySelector('.header .searchbar-form .search-button').click()
    })
    clicked = true
  }, 1000)
}

page.onLoadFinished = function() {
  if (clicked) {
    page.render('example.png');
    phantom.exit()
  }
}

page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.evaluate(function(productId, searchGoGo) {
      document.getElementById('search-key').value = productId;
      searchGoGo()
    }, productId, searchGoGo)
  }
});
