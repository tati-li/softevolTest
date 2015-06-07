var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    fs         = require('fs'),
    path       = require('path'),
    config     = require('./config');

var port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/front', express.static(config.paths.static));

app.get(/^(\/)(?!api)(.*)$/, function(req, res) {

  fs.readFile(path.resolve(config.paths.build), {encoding: 'utf-8'}, function(err,data){
    if (!err){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    } else {
      res.end(err.message);
    }
  });
});

var route = require('./controllers/router');

route.registerRoutes(app);

app.listen(port);