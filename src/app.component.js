(function () {
  'use strict';

  var app = angular
    .module('bkapp')
    .component('app', {
      templateUrl: 'app.component.html',
      controller: AppController
    });

  AppController.$inject = ['$scope'];
  function AppController($scope) {


    ////////////////

    $scope.title = 'Books Favorites Organizer System';

    ////////////////


  }

  app.filter('startFrom', function () {
    return function (input, start) {
      start = +start;
      return input.slice(start);
    }
  });
})();



/*
(function () {
  'use stricts';
  angular
    .module('bkapp.bookList')
    .controller('BookListPage', BookListPage);

  BookListPage.$inject = ["_", '$scope', '$window'];

  function BookListPage(_, $scope, $window) {


    $scope.LoginUser = JSON.parse($window.localStorage.getItem('User'));


    console.log("~~~ Book List Page Loaded !!! ~~~");
    console.log("User In Storage:", JSON.parse($window.localStorage.getItem('User')));

  }
})();*/