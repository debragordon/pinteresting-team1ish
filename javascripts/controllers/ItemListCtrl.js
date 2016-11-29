"use strict";

app.controller("ItemListCtrl", function($scope, $rootScope, ItemFactory) {
    $scope.items = [];

    let getItems = function() {
        ItemFactory.getItemList($rootScope.user.uid).then(function(fbItems) {
            console.log("items from controller", fbItems);
            $scope.items = fbItems;
        });
    };

    getItems();


    $scope.deleteItem = function(itemId) {
        console.log("You Deleted Me!");
        ItemFactory.deleteItem(itemId).then(function(response) {
            getItems();
        });
    };
                                    // thingy = item
    $scope.inputChange = function(thingy) {
        ItemFactory.editItem(thingy).then(function(response) {
            console.log("ctrl inputChange response", response);
        });
    };
});