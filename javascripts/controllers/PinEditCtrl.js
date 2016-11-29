"use strict";

app.controller('PinEditCtrl',function($scope, $routeParams, $location, PinFactory){
    $scope.newPin = {};
    let pinId = $routeParams.id;

    PinFactory.getSinglePin(pinId).then(function(onePin) {
        onePin.id = pinId;
        $scope.newPin = onePin;
    });

    $scope.addNewPin = function() {
        PinFactory.editPin($scope.newPin).then(function() {
            $scope.newPin = {};
            $location.url("/pins/list");
        });
    };
});
