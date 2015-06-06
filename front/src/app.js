'use strict';

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngMessages']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('customers', {
      url: '/',
      templateUrl: '/src/pages/customers/customers.html',
      controller: 'CustomersCtrl'
    })
    .state('customer', {
      url: '/detail/:id',
      templateUrl: '/src/pages/addCustomer/addCustomer.html',
      controller: 'EditCustomerCtrl',
      resolve: {
        customerId: function(){
          return null;
        },
        $modalInstance: function(){
          return null
        }
      }
    });

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
}]);




