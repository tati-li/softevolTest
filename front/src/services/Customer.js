app.service('Customer', ['$q', '$http', function ($q, $http) {

  // @todo: rename getData to getAllCustomers, getById on getCustomerById

  return {

    /**
     *
     * @returns {*|Prompt}
     */
    getData: function(){
      return $http.get('/api/customers').
        success(function(data, status, headers, config) {
          return data;
        }).
        error(function(data, status, headers, config) {
        });
    },

    /**
     *
     * @param id
     * @returns {promise|*|promise|promise|Function|promise}
     */
    getById: function(id){
      var res = $q.defer();

      $http.get('/api/customer/' + id).
          success(function(result) {
            res.resolve(result);
          }).
          error(function(result) {
            res.resolve([]);
          });

      return res.promise;
    },

    /**
     *
     * @param id
     * @returns {*|Prompt}
     */
    deleteCustomer: function(id){
      return $http.delete('/api/customer/' + id).
        success(function(data, status, headers, config) {
          console.log('data delete', data);
        }).
        error(function(data, status, headers, config) {
        });
    },

    /**
     *
     * @param data
     * @returns {*|Prompt}
     */
    addCustomer: function(data){
      var res = $q.defer();

      $http.post('/api/customer', data).
        success(function(result) {
          res.resolve(result);
        }).
        error(function(result) {
          res.resolve([]);
        });

      return res.promise;
    },


    editCustomer: function(id, data){
      var res = $q.defer();

      $http.put('/api/customer/' + id, data).
        success(function(result) {
          res.resolve(result);
        }).
        error(function(result) {
          res.resolve([]);
        });

      return res.promise;
    }

  }
}]);
