var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    fs   = require('fs'),
    path = require('path');

var port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/front', express.static('../front'));

app.get(/^(\/)(?!api)(.*)$/, function(req, res) {

  fs.readFile(path.resolve('../front/build' + '/index.html'), {encoding: 'utf-8'}, function(err,data){
    if (!err){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }else{
      console.log(err);
    }
  });
});

var route = require('./controllers/router');

route.registerRoutes(app);

app.listen(port);