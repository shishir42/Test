(function () {
    'use strict';
    var app = angular.module('app.services', []);

    app.factory('Utility', ['$sce', '$timeout', '$window', '$http', function ($sce, $timeout, $window, $http) {

        var UtilityObject = {

            showModalPopup: function (message) {
                alert(message);
            },

            convertTextToUppcase: function(str){
              return str.toUpperCase()
            }
        }

        return UtilityObject;

    }]);
})();
