(function () {
    'use strict';

    angular
             .module('app.modalDialog')
             .controller('ModalDialogController', ModalDialogController)

    ModalDialogController.$inject = ['$scope', '$modalInstance', 'modalObject'];

    function ModalDialogController($scope, $modalInstance, modalObject) {

        $scope.modalObject = modalObject;

        $scope.result = "";

        $scope.ok = function () {
            $scope.result = "ok";
            $modalInstance.close($scope.result);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.close = function () {
            $modalInstance.dismiss();
        };
    }

})();
