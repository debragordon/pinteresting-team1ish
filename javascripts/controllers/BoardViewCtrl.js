"use strict";

app.controller('BoardViewCtrl',function($scope, $routeParams, $rootScope, PinFactory){
    $scope.selectedBoard = {};
    $scope.pins = {};
    let boardId = $routeParams.id;

    let getPins = () => {
        PinFactory.getPinList($rootScope.user.uid, boardId).then(function(fbPins) {
            console.log("pins from controller", fbPins);
            console.log(boardId);
            $scope.pins = fbPins;
        });
    };
    getPins();

    $scope.deletePinFromBoard = (pinId) => {
        PinFactory.deleteBoardPin(pinId).then(() => {
            getPins();
        });
    };
});
