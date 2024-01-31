(function () {
  'use stricts';
  angular
    .module('bkapp.bookItem')
    .controller('BookItem', BookItem);

  BookItem.$inject = ["_", '$scope', '$window', 'bookListService'];

  function BookItem(_, $scope, $window, bookListService) {

    $scope.booksListItems = bookListService.getSharedBooksList();

    $scope.checkIfFavoriteBook = function (book) {
      var selectedBookIdex = _.findIndex($scope.LoginUser.FavoriteBooks, function (fBook) {
        return fBook.id === book.id;
      });
      if (selectedBookIdex > -1) {
        return true;
      }
      // is newly selected
      else {
        return false;
      }

    };

    $scope.addToFavorites = function (item) {
      item.Favorite = !item.Favorite;
      var selectedBookIndex = _.findIndex($scope.LoginUser.FavoriteBooks, function (fBook) {
        return fBook.id === item.id;
      });
      //var idx = $scope.partList.indexOf(participant.EmpId);

      // is currently selected
      if (selectedBookIndex > -1) {
        $scope.LoginUser.FavoriteBooks.splice(selectedBookIndex, 1);
      }
      // is newly selected
      else {
        $scope.LoginUser.FavoriteBooks.push(item);
      }

      //$scope.LoginUser.FavoriteBooks.push(item);
      $window.localStorage.setItem('User', JSON.stringify($scope.LoginUser));
    }

    $scope.getBookListService = function (searchStr) {
      bookListService.getAllBooksByStr(searchStr).then(function (d) {
        console.log('books data', d);
      });
    }

    $scope.LoginUser = JSON.parse($window.localStorage.getItem('User'));

    $scope.getBookList = function () {
      console.log("get All Books With Parm", $scope.bookSearch);
      $scope.getBookListService($scope.bookSearch);
    };

    //#region Organization Details Modals

    $scope.options = {
      color: "#ffffff",		// Define background color. HEX, HSL, RGB, RBA
      animatedIn: "slideInRight",		// Transition when the modal goes in
      // animatedIn: "slideInLeft",		// Transition when the modal goes in
      animatedOut: "slideOutRight",		// Transition when the modal goes out
      animationDuration: ".6s",	// Animation duration in seconds
      overflow: "hidden",	// This makes your modal scrollable or not
      width: "40%",
      height: "calc(100% - 73px)",
      top: "78px",
      right: "0px",
      left: "auto",
      border: "1px solid #707070",
      boxShadow: "3px 0 20px rgba(0,0,0,0.2)"
    };
    //$scope.bookDetails= {}

    // Event function executed before open modal.
    $scope.beforeOpen = function (item) {
      $scope.$apply(function () {

        $scope.bookDetails = item;
        console.log($scope.bookDetails);
        bookListService.setSharedBookDetails($scope.bookDetails);
        $scope.$emit("bookDetails");
        $('#bookAnimatedModal').show();
        // $scope.initprofessionInfo();
      });
    };


    // Event function executed after close modal.
    $scope.afterClose = function () {
      $('#bookAnimatedModal').hide();
      console.log("Bye");
    };


    //#endregion


    //console.log("~~~ Book Item Loaded !!! ~~~");
    // console.log("User In Storage:", JSON.parse($window.localStorage.getItem('User')));
    // console.log("get All Books With Parm", $scope.booksListItems);

  }
})();

/*(function () {
  'use strict';

  angular
    .module('bkapp.bookItem')
    .component('bookItem', {
      templateUrl: '/src/controllers/bookItem/bookItem.component.html',
      controller: BookItemController,
      bindings: {
        book: '<'
      },
    });

  BookItemController.$inject = [];
  function BookItemController() {
    const $ctrl = this;
    $ctrl.$onInit = onInit;
    $ctrl.$onChanges = onChanges;
    $ctrl.$onDestroy = onDestroy;

    ////////////////

    function onInit() {

    }

    function onChanges(changesObj) {

    }

    function onDestroy() {

    }
  }
})();*/