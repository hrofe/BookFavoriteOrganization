(function () {
  "use strict";
  angular.module("bkapp.bookItem")
    .directive("bookItem", bookItemDirective);

  function bookItemDirective() {
    return {
      restrict: "E",
      scope: {
        item: "="
      },
      templateUrl: "/src/controllers/bookItem/bookItem.component.html",
      controller: "BookItem"
    }
  }
})();