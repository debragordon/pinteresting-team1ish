"use strict";

app.controller('ItemViewCtrl',function($scope, $routeParams, ItemFactory){
    console.log("$routeParams", $routeParams);
    let itemId = $routeParams.id;
    $scope.selectedItem = {};

    ItemFactory.getSingleItem(itemId).then(function(oneItem) {
        oneItem.id = itemId;
        $scope.selectedItem = oneItem;
    });
});