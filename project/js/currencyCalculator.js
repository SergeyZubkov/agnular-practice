(function() {
    'use strict';
    angular
        .module('finance')
        .directive('currencyCalculator', currencyCalculator);
    currencyCalculator.$inject = ['currencyService'];
    /* @ngInject */
    function currencyCalculator() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: '/js/currencyCalculator.html',
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        function link(scope, element, attrs) {
          element.addClass('currency-calculator');
        }
    }
    /* @ngInject */
    function Controller($scope, $element, currencyService) {
      var vm = this;
      vm.reverse = true;
      vm.myComparator = myCamparator;
      vm.calculate = calculate;
      active();

      ////////////
      function active() {
        currencyService.getExchangeRates()
          .then(function(response) {
            vm.currencies = getCorrectNames(response.data.query.results.rate)
            vm.currenciesToConvert = [{Name: 'RUB'}].concat(vm.currencies);
            vm.fromCurrencyName = vm.currenciesToConvert[0];
            vm.toCurrencyName = vm.currenciesToConvert[1];
          },
          function(error) {
            console.log(error)
          });
      }
      function myCamparator(a,b) {
        console.dir(a)
        return +a.value.Rate - (+b.value.Rate);
      }
      function getCorrectNames(data) {
        return data.map(function(e,i) {
           e.Name = e.Name.split('/')[0].toString();
          return e
        })
      }
      function calculate() {
        if(vm.amount&&vm.fromCurrencyName&&vm.toCurrencyName) {
          currencyService.calculate(vm.amount, vm.fromCurrencyName, vm.toCurrencyName)
          .then(function(res) {
            vm.result = vm.amount + ' ' + vm.fromCurrencyName.Name + " = " + res + ' ' + vm.toCurrencyName.Name;
          },function(error) {
            console.log(error)
          });
        } else {
          return;
        }
      }
    }
})();

