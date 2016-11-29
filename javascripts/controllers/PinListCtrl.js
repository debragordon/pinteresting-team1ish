"use strict";

app.controller("PinListCtrl", function($scope, $rootScope, PinFactory) {
    $scope.pins = [];

    let getPins = function() {
        PinFactory.getPinList($rootScope.user.uid).then(function(fbPins) {
            console.log("pins from controller", fbPins);
            $scope.pins = fbPins;
        });
    };

    getPins();

    $scope.deletePin = function(pinId) {
        console.log("You Deleted Me!");
        PinFactory.deletePin(pinId).then(function(response) {
            getPins();
        });
    };
});
