(function() {
    'use strict';
    angular
        .module('financep')
        .directive('CurrencyCalculator', CurrencyCalculator);
    CurrencyCalculator.$inject = ['currencyService'];
    /* @ngInject */
    function CurrencyCalculator() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            templateUrl: 'currencyCalculator.html',
            scope: {
            }
        };
        return directive;
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function Controller(currencyService) {
      var vm = this;
      active();

      ////////////
      function active() {
        currencyService.getExhangeRates()
          .success(function(response) {
            vm.currencies = response
          })
          .error(function(error) {
            console.log(error)
          })
      }
    }
})();