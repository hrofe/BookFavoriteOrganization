(function () {
  'use stricts';
  angular
    .module('bkapp.login')
    .controller('LoginPage', LoginPage);

  LoginPage.$inject = ["$scope", "_", '$state', '$window'];

  function LoginPage($scope, _, $state, $window) {

    // const $ctrl = this;
    // $ctrl.navigateTo = navigateTo;

    $scope.user = {
      UserName: '',
      Password: '',
      FavoriteBooks: []
    };

    $scope.navigate = function (state) {
      if (angular.isString(state) && state != '') {
        //  console.log("User:", $scope.user);
        $window.localStorage.setItem('User', JSON.stringify($scope.user));
        $state.go(state);
      }
    };

    //console.log("~~~ Login Page Loaded !!! ~~~");

  }
})();