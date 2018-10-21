var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var app=express();


/*
Furkan Kaya
*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var engine =require('./engine.js');
app.use('/engine',engine);

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
