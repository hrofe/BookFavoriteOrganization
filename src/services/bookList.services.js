(function () {
  "use strict";
  angular.module("bkapp.services")
    .factory("bookListService", bookListService);

  bookListService.$inject = ["$http", "$q", "_"];

  function bookListService($http, $q) {
    var sharedBooksList = {};
    var sharedBookDetails = {};
    return {
      BookListHandlersUrl: "https://www.googleapis.com/books/v1/volumes?maxResults=40&",
      getSharedBooksList: function () {
        return sharedBooksList;
      },
      setSharedBooksList: function (books) {
        sharedBooksList = books;
        return;
      },
      setSharedBookDetails: function (books) {
        sharedBookDetails = books;
        return;
      }, getSharedBookDetails: function () {
        return sharedBookDetails;
      },
      getAllBooksByStr: function (string) {
        var deferred = $q.defer();
        $http({
          method: "get",
          url: this.BookListHandlersUrl,
          params: {
            q: string
          }
        }).then(function (response) {
          console.log(response, 'res');
          sharedBooksList = response.data;
          //data = response.data;
          deferred.resolve(response.data);
        }, function (error) {
          console.log("error:" + error);
          deferred.reject(error);
        });
        return deferred.promise;
      },
    }
  }

})();