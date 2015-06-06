app.controller('EditCustomerCtrl',['$scope', 'Customer', '$stateParams', 'customerId', '$modalInstance', '$state', function($scope, Customer, $stateParams, customerId, $modalInstance, $state) {
  $scope.customer = [];

  $scope.isNewPage = $modalInstance;

  $scope.title = 'Edit';

  var idParam = $stateParams.id || customerId;

  Customer.getById(idParam).then(function(result){
    $scope.customer = result[0];
  });

  $scope.SubmitCustomer = function(title){
    if(title == 'Edit'){
      if ($scope.CustomerForm.$valid) {
        var data = {
          "id":         $scope.customer.id,
          "name":       $scope.customer.name,
          "email":      $scope.customer.email,
          "telephone":  $scope.customer.telephone,
          "address":    $scope.customer.address,
          "city":       $scope.customer.city,
          "state":      $scope.customer.state,
          "zip":        $scope.customer.zip
        };

        Customer.editCustomer($scope.customer.id, data).then(function(){
          $state.reload();
          if($modalInstance) {
            $modalInstance.close();
          }
          else {
            alert('Customer ' + $scope.customer.name + ' edited');
            $state.go('customers');
          }
        });
      }
    }
  };

  $scope.cancelEditCustomer = function (){
      $modalInstance.close();
  };

}]);