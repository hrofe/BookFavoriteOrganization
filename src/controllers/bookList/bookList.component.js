(function () {
  'use stricts';
  angular
    .module('bkapp.bookList')
    .controller('BookListPage', BookListPage);

  BookListPage.$inject = ["_", '$scope', '$window', 'bookListService'];

  function BookListPage(_, $scope, $window, bookListService) {

    $scope.bookSearch = "";
    $scope.bookList = [];
    $scope.bookDetails = {};

    $scope.$on('bookDetails', function () {

      $scope.bookDetails = bookListService.getSharedBookDetails()


    });

    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
      return Math.ceil($scope.bookList.length / $scope.pageSize);
    }

    $scope.getBookListService = function (searchStr) {
      bookListService.getAllBooksByStr(searchStr).then(function (d) {
        console.log('books data', d);
        console.log('book List', d.items);
        $scope.bookList = d.items;

      });
    }

    $scope.LoginUser = JSON.parse($window.localStorage.getItem('User'));

    $scope.getBookList = function () {
      // console.log("get All Books With Parm", $scope.bookSearch);
      $scope.getBookListService($scope.bookSearch);
    };


    // console.log("~~~ Book List Page Loaded !!! ~~~");
    // console.log("User In Storage:", JSON.parse($window.localStorage.getItem('User')));

  }
})();