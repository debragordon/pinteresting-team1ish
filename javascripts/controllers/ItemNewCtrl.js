"use strict";

app.controller("ItemNewCtrl", function($scope, $location, $rootScope, ItemFactory) {
    $scope.newTask = {};

    $scope.addNewItem = () => {
        $scope.newTask.isCompleted = false;
        $scope.newTask.uid = $rootScope.user.uid;
        console.log("newTask in function", $scope.newTask);
        ItemFactory.postNewItem($scope.newTask).then((itemId) => {
            $location.url("/items/list");
            $scope.newTask = {};
        });
    };

});