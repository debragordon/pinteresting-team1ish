"use strict";

app.controller("PinNewCtrl", function($scope, $location, $rootScope, PinFactory, BoardFactory) {
    $scope.newPin = {};
    $scope.boards = {};

    let getBoards = () => {
        BoardFactory.getBoardList($rootScope.user.uid).then((response) => {
            $scope.boards = response;
        });
    };
    getBoards();

    $scope.addNewPin = (newPin, boardid) => {
        $scope.newPin.uid = $rootScope.user.uid;
        $scope.newPin.boardid = boardid;
        // might be a problem if the user has multiple boards....
        console.log("newPin = ", newPin);
        PinFactory.postNewPin($scope.newPin).then((pinId) => {
            $location.url("/allpins/list");
            $scope.newPin = {};
        });
    };

});
