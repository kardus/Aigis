var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({show: false, openDevTools: true, dock: true});
var urls = [];

var google = function*(searchParam) {
  var search = yield nightmare
    .wait(1000)
    .goto('https://www.google.com/#q='+ searchParam)
    .wait(1000)
    .evaluate(function() {
      return Array.from(document.querySelectorAll("h3.r a"))
          .map((element) => element.href);
    }).then(function(result) {
        console.log(result[0])
    })
}

vo(google)('lol')
