"use strict";

app.controller('AllPinsCtrl',function($scope, $rootScope, PinFactory, BoardFactory){
    $scope.pins = {};
    $scope.searchText = "";
    $scope.boards = {};

    let getPins = function() {
        PinFactory.getAllPins().then((response) => {
            $scope.pins = response;
        });
    };
    getPins(); // populating $scope.pins

    let getBoards = () => {
        BoardFactory.getBoardList($rootScope.user.uid).then((response) => {
            $scope.boards = response;
            console.log("$scope.boards", $scope.boards);
        });
    };
    getBoards(); // populating $scope.boards

    $scope.addPinToBoard = function(newPin, boardId) {
        console.log("You added a pin!", newPin);
        console.log("$rootScope",$rootScope.user.uid);
        newPin.boardid = boardId;
        newPin.uid = $rootScope.user.uid;
        console.log(newPin);
        PinFactory.postNewPinToBoard(newPin);
    };

});