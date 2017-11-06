(function () {
    'use strict';

    angular
        .module('app.shoppingConfiguration')
        .controller('ShoppingConfiguration', ShoppingConfiguration);

    ShoppingConfiguration.$inject = ['$state', '$scope', '$http', 'Utility'];


    function ShoppingConfiguration($state, $scope, $http, Utility) {
        var vm = this;
        vm.cart = "";
        vm.shoppingDailogConfirmed = shoppingDailogConfirmed;

        vm.alertTemplateURL = "app/shared/modal/partial-layout/alert-popup.html";
        vm.editCartTemplateURL = "app/shared/modal/partial-layout/edit-cart.html";

        vm.title = "YOUR SHOPPING BAG";
        vm.sizeTitle = "SIZE";
        vm.qtyTitle = "QTY";
        vm.priceTitle = "PRICE";
        vm.styleText = "Style #: ";
        vm.colorText = "Color :";
        vm.appHelpText = "Need help or have questions?";
        vm.appCustomer = "Call Customer Service at 1-800-555-5555";
        vm.chat = "Chat with one of our style lists";
        vm.return = "See return & exchange policy";
        vm.promoText = "ENTER PROMOTION CODE OR GIFT CARD";
        vm.applyCodeText = "APPLY";
        vm.subtotalText = "SUBTOTAL";
        vm.promoCodeText = "PROMOTION CODE JF10 APPLIED";
        vm.discount = 7;
        vm.shippingText = "ESTIMATED SHIPPING";
        vm.shippingStatus = "FREE";
        vm.totalText = "ESTIMATED TOTAL";
        vm.totalAmount = 0;
        vm.estimatedTotal = 0;
        vm.curreny = "$";
        vm.applyCode = "JF10";
        vm.continueShopping = "CONTINUE SHOPPING";
        vm.checkOut = "CHECKOUT";
        vm.securetext = "Secure checkout. Shopping is always safe & secure";
        vm.editCart = "EDIT";
        vm.removeItem = "X REMOVE";
        vm.saveLater = "SAVE FOR LATER";
        vm.selectedItem = "";

        vm.textUpperCase = textUpperCase;
        vm.subtotal = subtotal;
        vm.promoCode = promoCode;
        vm.estimatedTotal = estimatedTotal;
        vm.onEdit = onEdit;
        vm.sizeConversion = sizeConversion;
        vm.removeSelectedItem = removeSelectedItem;

        $state.go('shoppingConfig.shoppingView');

        //Modal Popup Object
        vm.shoppingDailog = {
            showModal: false,
            templateURL: vm.alertTemplateURL,
            title: "Delete Selected Item",
            message: "Do you want to delete item?",
            confirmation: true,
            acceptcaption: "Ok",
            rejectcaption: "Cancel"
        }

        //Edit Cart Dailog
        vm.editCartDailog = {
            showModal: false,
            templateURL: vm.editCartTemplateURL,
            title: "",
            message: "",
            modalObject:"",
            confirmation: false,
        }

        vm.shoppingDailog.showModal = false;

        function shoppingDailogConfirmed() {
            var index=vm.cart.productsInCart.indexOf(vm.selectedItem)
            vm.cart.productsInCart.splice(index,1);
            vm.itemCount = vm.cart.productsInCart.length + " ITEMS";
        }

        function textUpperCase(str){
          return Utility.convertTextToUppcase(str)
        }

        function subtotal(){
          var total = 0;
          angular.forEach(vm.cart.productsInCart, function(item) {
            total += item.p_quantity * item.p_originalprice;
          });

          vm.totalAmount = total;
          vm.totalAmount = discountOnItemCount(vm.totalAmount);
          return vm.curreny + vm.totalAmount;
        }

        function promoCode(){
          return "-" + vm.curreny + vm.discount;
        }

        function estimatedTotal() {
            return vm.curreny + (vm.totalAmount - vm.discount);
        }

        function discountOnItemCount(amount){
          var count = vm.itemCount;
          var discountAmount = amount;
          if(count <= 3){
              discountAmount = amount - (discountAmount * 0.05)
          }else if(count>=3 && count <= 6){
              discountAmount = amount - (discountAmount * 0.1)
          }else{
              discountAmount = amount - (discountAmount * 0.25)
          }

          return discountAmount;
        }

        function onEdit(item){
          vm.editCartDailog.showModal = true;
          vm.editCartDailog.modalObject = item;
        }

        function sizeConversion(data){
          if(typeof data === "object"){
            return data.code;
          }else{
            return data;
          }
        }

        function removeSelectedItem(item){
          vm.selectedItem = item;
          vm.shoppingDailog.showModal = true;
        }

        $scope.$on('$viewContentLoaded', function (event) {
            $http.get('cart.json')
                    .success(function (data) {
                        vm.cart = data;
                        vm.itemCount = vm.cart.productsInCart.length + " ITEMS";
                    })
                    .error(function (data, status, error, config) {

                    });
        });

        $scope.$on("$destroy", function handler() {
        });
    }

})();
