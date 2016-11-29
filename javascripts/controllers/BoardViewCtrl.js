"use strict";

app.controller('BoardViewCtrl',function($scope, $routeParams, BoardFactory){
    console.log("$routeParams", $routeParams);
    let boardId = $routeParams.id;
    $scope.selectedBoard = {};

    BoardFactory.getSingleBoard(boardId).then(function(oneBoard) {
        oneBoard.id = boardId;
        $scope.selectedBoard = oneBoard;
    });
});
