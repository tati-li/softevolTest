var fs     = require('fs'),
    config = require('../config'),
    path   = config.paths.customers;

// @todo: change console.log(err) error handling on res.end(err.message) way.

exports.getAllCustomers = function (req, res) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (!err) {
      res.end(data);
    } else {
      console.log(err);
    }
  });
};

exports.getCustomerById = function (req, res) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (!err) {
      var data = JSON.parse(data);
      var customer = data.filter(function(val) {
        return val.id == req.params.id ? val : null;
      });
      res.end( JSON.stringify(customer));
    } else {
      console.log(err);
    }
  });
};

exports.addCustomer = function (req, res) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (!err) {
      var custList = JSON.parse(data);
      custList.push(req.body);
      fs.writeFile(path, JSON.stringify(custList), function(err) {
        if (err) throw err;
        console.log('customer added');
      });
      res.end( JSON.stringify(custList));
    } else {
      console.log(err);
    }
  });
};
exports.updateCustomer = function (req, res) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (!err) {
      var custList = JSON.parse(data);
      var customers = custList.map(function(val) {
        return val.id == req.params.id ? req.body : val;
      });
      fs.writeFile(path, JSON.stringify(customers), function(err) {
        console.log('customer updated');
      });
      res.end( JSON.stringify(customers));
    } else {
      console.log(err);
    }
  });
};

exports.deleteCustomer = function (req, res) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (!err) {
      var custList = JSON.parse(data);
      var customer = custList.filter(function(val) {
        return val.id !== req.params.id;
      });
      fs.writeFile(path, JSON.stringify(customer), function(err) {
        if (err) throw err;
        console.log('customer deleted');
      });
      res.end(JSON.stringify(customer));
    } else {
      console.log(err);
    }
  });
};