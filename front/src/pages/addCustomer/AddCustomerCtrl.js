app.controller('AddCustomerCtrl',['$scope', 'Customer', '$state', '$modalInstance', function($scope, Customer, $state, $modalInstance) {

  $scope.title = 'Add';

  $scope.SubmitCustomer = function(title){
    if(title == 'Add'){
      if ($scope.CustomerForm.$valid) {
        var data = {
          "id":         new Date(),
          "name":       $scope.customer.name,
          "email":      $scope.customer.email,
          "telephone":  $scope.customer.telephone,
          "address":    $scope.customer.address,
          "city":       $scope.customer.city,
          "state":      $scope.customer.state,
          "zip":        $scope.customer.zip
        };

        Customer.addCustomer(data).then(function(){
          $state.reload();
          $modalInstance.close();
        })
      }
    }
  };

  $scope.cancelAddingCustomer = function (){
    $modalInstance.close();
  };

}]);