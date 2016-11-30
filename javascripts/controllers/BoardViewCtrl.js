"use strict";

app.controller('BoardViewCtrl',function($scope, $routeParams, $rootScope, PinFactory, BoardFactory){
    $scope.selectedBoard = {};
    $scope.pins = {};
    let boardId = $routeParams.id;

    let getPins = () => {
        PinFactory.getPinList($rootScope.user.uid, boardId).then(function(fbPins) {
            BoardFactory.getSingleBoard(boardId).then(function(response){
                $scope.selectedBoard = response;
                $scope.pins = fbPins;
            });
        });
    };
    getPins();

    $scope.deletePinFromBoard = (pinId) => {
        PinFactory.deleteBoardPin(pinId).then(() => {
            getPins();
        });
    };
});
