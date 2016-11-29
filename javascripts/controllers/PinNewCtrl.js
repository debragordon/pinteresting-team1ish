"use strict";

app.controller("PinNewCtrl", function($scope, $location, $rootScope, PinFactory) {
    $scope.newPin = {};

    $scope.addNewPin = () => {
        $scope.newPin.isCompleted = false;
        $scope.newPin.uid = $rootScope.user.uid;
        console.log("newPin in function", $scope.newPin);
        PinFactory.postNewPin($scope.newPin).then((pinId) => {
            $location.url("/pins/list");
            $scope.newPin = {};
        });
    };

});
