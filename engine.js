var express = require('express');
var router = express.Router();
var client= require('request');
var result=[];
const jsdom = require("jsdom");
var constants=require('./constants.js');
router.get('/find/:arg', function(req, res){
///      console.log("param :"+req.params.arg);
//       console.log("url :"+constants.RESOURCEURL);

      result=[];
      client.get({ url: constants.RESOURCEURL + req.params.arg },function(error, response, body) {
             if (!error && response.statusCode == 200) {
                 parseData(body);
                 res.json(result);
                 res.status(200);
                }
            });

});

function parseData(html){
  const {JSDOM} = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  var arr= $('#englishResultsTable').first()[0];
   for (var x=3; x<arr.rows.length; x++){
     if(arr.rows[x].cells[3]!=undefined){
    //console.log($(arr.rows[x].cells[3]).text());
    result.push($(arr.rows[x].cells[3]).text().trim());
    
     }
   }
}

 module.exports = router;
