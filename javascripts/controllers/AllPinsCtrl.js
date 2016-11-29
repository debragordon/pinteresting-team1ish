"use strict";

app.controller('AllPinsCtrl',function($scope, PinFactory){
    $scope.pins = {};
    $scope.searchText = "";

    let getPins = function() {
        PinFactory.getAllPins().then((response) => {
            $scope.pins = response;
        });
    };

    getPins();
});