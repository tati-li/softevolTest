app.controller('CustomersCtrl',['$scope', 'Customer', '$modal', function($scope, Customer, $modal) {

  $scope.customers = [];

  Customer.getAllCustomers().then(function(result){
    $scope.customers = result.data;
  });

  $scope.editCustomer = function(id){
    $modal.open({
      templateUrl: '/src/pages/addCustomer/addCustomer.html',
      controller: 'EditCustomerCtrl',
      resolve: {
        customerId: function () {
          return id
        }
      },
      backdrop: 'static'
    });
  };

  $scope.deleteCustomer = function (id, name){
    Customer.deleteCustomer(id).then(function(result){
      $scope.customers = result.data;
      $modal.open({
        templateUrl: '/src/pages/customer/modalAlert.html',
        controller: 'AlertCtrl',
        resolve: {
          alert: function () {
            return { type: 'success', msg: 'Customer ' + name + ' was deleted' }
          }
        }
      });
      return result.data;
    });
  };

  $scope.addCustomer = function () {
    $modal.open({
      templateUrl: '/src/pages/addCustomer/addCustomer.html',
      controller: 'AddCustomerCtrl',
      backdrop: 'static'
    });
  };

}]);