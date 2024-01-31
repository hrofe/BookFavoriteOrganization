(function () {
  'use strict';

  angular
    .module('bkapp.core')
    .config(configure);

  configure.$inject = ['$locationProvider'];
  function configure($locationProvider) {
    $locationProvider.html5Mode(false);
  }
})();