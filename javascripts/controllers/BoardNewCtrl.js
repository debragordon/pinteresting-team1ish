"use strict";

app.controller("BoardNewCtrl", function($scope, $location, $rootScope, BoardFactory) {
    $scope.newBoard = {};

    $scope.addNewBoard = () => {
        $scope.newBoard.isCompleted = false;
        $scope.newBoard.uid = $rootScope.user.uid;
        console.log("newBoard in function", $scope.newBoard);
        BoardFactory.postNewBoard($scope.newBoard).then((boardId) => {
            $location.url("/boards/list");
            $scope.newBoard = {};
        });
    };

});
