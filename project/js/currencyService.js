(function() {
    'use strict';
    angular
        .module('finance')
        .factory('currencyService', currencyService);
    currencyService.$inject = ['$http', '$q'];
    /* @ngInject */
    function currencyService($http, $q) {
        var service = {
            getExchangeRates: getExchangeRates,
            calculate: calculate,
        };
        return service;
        ////////////////
        function getExchangeRates() {
          return $http.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+"USDRUB,EURRUB,UAHRUB,JPYRUB,CNYRUB,BYNRUB"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
        }
        function calculate(amount, from, to) {
            var deferred = $q.defer();
            $http.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+"' + from.Name + to.Name + '"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
                 .success(function(response) {
                    console.log(response)
                    var res = (amount * +response.query.results.rate.Rate).toFixed(2);
                    deferred.resolve(res)
                 })
                 .error(function(error) {
                    console.log(error)
                    deferr
                });
            return deferred.promise;
        }
    }
})();