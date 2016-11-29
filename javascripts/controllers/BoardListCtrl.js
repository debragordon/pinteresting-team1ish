"use strict";

app.controller("BoardListCtrl", function($scope, $rootScope, BoardFactory) {
    $scope.boards = [];

    let getBoards = function() {
        BoardFactory.getBoardList($rootScope.user.uid).then(function(fbBoards) {
            console.log("boards from controller", fbBoards);
            $scope.boards = fbBoards;
        });
    };
    getBoards();

    $scope.deleteBoard = function(boardId) {
        console.log("You Deleted Me!");
        BoardFactory.deleteBoard(boardId).then(function(response) {
            getBoards();
        });
    };
});
