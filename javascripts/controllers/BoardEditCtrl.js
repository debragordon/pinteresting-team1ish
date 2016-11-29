"use strict";

app.controller('BoardEditCtrl', function($scope, $routeParams, $location, BoardFactory) {
    $scope.newBoard = {};
    let pinId = $routeParams.id;

    BoardFactory.getSingleBoard(pinId).then(function(oneBoard) {
        oneBoard.id = pinId;
        $scope.newBoard = oneBoard;
    });

    $scope.addNewBoard = function() {
        BoardFactory.editBoard($scope.newBoard).then(function() {
            $scope.newBoard = {};
            $location.url("/pins/list");
        });
    };
});
