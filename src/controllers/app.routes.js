(function () {
  'use strict';

  angular
    .module('bkapp.controllers')
    .config(configure);

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/src/controllers/login/login.component.html',
        controller: 'LoginPage'

      })
      .state('bookList', {
        url: '/BookList',
        templateUrl: '/src/controllers/bookList/bookList.component.html',
        controller: 'BookListPage'

      })
      ;

    $urlRouterProvider.otherwise('login');
  }
})();