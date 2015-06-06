var controller = require('./controller');

function registerRoutes(app){
  app.get(    '/api/customers',     controller.getAllCustomers);
  app.get(    '/api/customer/:id',  controller.getCustomerById);
  app.post(   '/api/customer',      controller.addCustomer);
  app.put(    '/api/customer/:id',  controller.updateCustomer);
  app.delete( '/api/customer/:id',  controller.deleteCustomer);
}

exports.registerRoutes = registerRoutes;
