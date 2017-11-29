#!/usr/bin/env nodejs
var http = require('http');
var url  = require('url');
var natural = require('natural');

Array.prototype.getUnique = function() {
    var o = {}, a = []
    for (var i = 0; i < this.length; i++) o[this[i]] = 1
    for (var e in o) a.push(e)
    return a
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var wordnet = new natural.WordNet();

  wordnet.lookup(query.w, function(results) {
    let synonymArray = [];
      results.forEach(function(result) {
          result.synonyms.forEach((syns) => {
            synonymArray.push(syns);
          });
      });

      if(synonymArray.length == 0){
        var Typo = require("typo-js");
        var dictionary = new Typo("en_US");
        let sugArray = dictionary.suggest(query.w);
        let suggetWord = sugArray[0];

        wordnet.lookup(suggetWord, function(results) {
          let synonymArray = [];
          results.forEach(function(result) {
              result.synonyms.forEach((syns) => {
                synonymArray.push(syns);
              });
              res.end(JSON.stringify(synonymArray.getUnique()));
          });
        });

      }else{
        res.end(JSON.stringify(synonymArray.getUnique()));
      }
  });
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
