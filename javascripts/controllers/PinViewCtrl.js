"use strict";

app.controller('PinViewCtrl',function($scope, $routeParams, PinFactory){
    console.log("$routeParams", $routeParams);
    let pinId = $routeParams.id;
    $scope.selectedPin = {};

    PinFactory.getSinglePin(pinId).then(function(onePin) {
        onePin.id = pinId;
        $scope.selectedPin = onePin;
    });
});
