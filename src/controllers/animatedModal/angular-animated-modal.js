/*!
 * angular-animated-modal.js
 *
 * @brief
 * Angular animated modal is a angular.js for animatedModal.js, a jQuery plugin to create a fullscreen modal with CSS3 transitions.
 *
 * Supported browsers: Chrome, Firefox, Safari, Opera, Internet Explorer 10+
 *
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Copyright (c) 2016 Chinh Nguyen, http://angularanimatedmodal.oqbox.com
 *
 * @author  Chinh Nguyen, <duychinhnguyenvn@gmail.com>
 * @version 1.0
 * @date    2015-07-06
 */

var nganimatedModal = angular.module("angular-animated-modal", []);

nganimatedModal.directive("animatedModal", function () {
    function updateOptions(scope, element) {
        var id = element.attr("id");
       // element.remove();
       // scope.$destroy();
        scope.options = scope.options || {};
        scope.setting = angular.extend(scope.setting, scope.options);
        //scope.setting.updateSettings(scope.setting);
        $("#" + id).animatedModal(scope.setting);
       
        //$("#" + id).animatedModal(scope.setting).updateSettings(scope.setting);
    }
    return {
        restrict: "A",
        scope: {
            options: "=",
            beforeOpen: "&",
            afterClose: "&",
            afterOpen: "&"
        },
        //templateUrl: function (element, attribute) {
        //    return "Scripts/app/animatedModal/partials/" + attribute.templateName + ".html";
        //},
        link: function (scope, element, attrs) {
            scope.$on('animatedModal.refresh', function () {
                updateOptions(scope, element);
            });
            var id = "animatedmodal" + Math.floor(Math.random() * 100000000);
            attrs.href = attrs.href || "animatedModal";
            //console.log(attrs.href);
            scope.options = scope.options || {};
            // Set element id
            element.attr("id", id);
            scope.setting = {
                modalTarget: attrs.href.replace("#", "")
            };
            scope.setting = angular.extend(scope.setting, scope.options);
            if (scope.setting.modalTarget !== attrs.href.replace("#", "")) {
                element.attr("href", "#" + scope.setting.modalTarget);
            }
            scope.beforeOpen = scope.beforeOpen || function (event, obj) { };
            scope.afterOpen = scope.afterOpen || function (event, obj) { };
            scope.afterClose = scope.afterClose || function () { };

            scope.setting.beforeOpen = function (event, obj) {
                scope.beforeOpen();
            };
            scope.setting.afterClose = function () {
                scope.afterClose();
            };
            scope.setting.afterOpen = function (event, obj) {
                scope.afterOpen();
            };
            //$("#" + id).animatedModal(scope.setting);
            updateOptions(scope,element);
        }
    };
});