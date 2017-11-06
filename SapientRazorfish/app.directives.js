(function () {
    'use strict';

    var app = angular.module('app.directives', []);

    app.directive('modal', ['$modal', '$timeout', function ($modal, $timeout) {
        return {
            restrict: 'AE',
            replace: 'true',
            template: '',
            scope: {

                confirm: '&confirm',
                cancel: '&cancel',
                modalobject: '=modalobject'

            },
            link: function (scope, element, attrs) {
                var isHandled = false;
                scope.$on('showPopup', function (event, args) {
                    showModalDialog();
                    scope.modalobject.message = args.message;
                });


                scope.$watch(function () {
                    return scope.modalobject.showModal;
                }, function (newValue) {
                    if (newValue === true) {
                        showModalDialog();
                    }
                });
                function showModalDialog() {
                    $timeout(function () {
                        isHandled = false;
                    }, 0);

                    openModal();
                    scope.modalobject.showModal = false;
                }
                function openModal() {

                    var modalInstance = $modal.open({
                        templateUrl: 'app/shared/modal/modalDialog.html',
                        controller: 'ModalDialogController',
                        size: '',
                        resolve: {
                            modalObject: function () {
                                return scope.modalobject;
                            }
                        },
                        backdrop: 'static'
                    });

                    modalInstance.default = function () {
                        if (isHandled) {
                            return;
                        }

                        isHandled = true;

                        if (scope.cancel) {
                            scope.cancel();
                        } else if (scope.confirm) {
                            scope.confirm();
                        }
                        // User cancelled
                        modalInstance.dismiss();
                        modalInstance = null;
                    };

                    modalInstance.result.then(function (result) {
                        if (isHandled) {
                            return;
                        }

                        isHandled = true;

                        //User confirmed
                        if (scope.confirm) {
                            scope.confirm();
                        }
                        modalInstance.dismiss();
                        modalInstance = null;

                    }, function () {

                        if (isHandled) {
                            return;
                        }

                        isHandled = true;
                        if (scope.cancel) {
                            scope.cancel();
                        }
                        // User cancelled
                        modalInstance.dismiss();
                        modalInstance = null;
                    });

                }

            }
        };

    }]);
})();