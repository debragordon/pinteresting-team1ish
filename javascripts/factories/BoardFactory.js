"use strict";

app.factory("BoardFactory", function($q, $http, FIREBASE_CONFIG) {

    var getBoardList = function(userId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
                .success((response) => {
                    let boards = [];
                    Object.keys(response).forEach((key) => {
                        response[key].id = key;
                        boards.push(response[key]);
                    });
                    resolve(boards);
                })
                .error((errorResponse) => {
                    reject(errorResponse);
                });
        });
    };

    var postNewBoard = function(newBoard) {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`,
                    JSON.stringify({
                        title: newBoard.title,
                        desc: newBoard.desc,
                        uid: newBoard.uid
                    })
                )
                .success((postResponse) => {
                    resolve(postResponse);
                })
                .error((postError) => {
                    reject(postError);
                });
        });
    };

    var deleteBoard = function(itemId) {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${itemId}.json`)
                .success((deleteResponse) => {
                    resolve(deleteResponse);
                })
                .error((deleteError) => {
                    reject(deleteError);
                });
        });
    };

    var getSingleBoard = function(itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/boards/${itemId}.json`)
                .success((getSingleResponse) => {
                    resolve(getSingleResponse);
                })
                .error((getSingleError) => {
                    reject(getSingleError);
                });
        });
    };

    var editBoard = function(editBoard) {
        console.log("factory edit", editBoard);
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${editBoard.id}.json`,
                    JSON.stringify({
                        assignedTo: editBoard.assignedTo,
                        isCompleted: editBoard.isCompleted,
                        task: editBoard.task,
                        uid: editBoard.uid
                    })
                )
                .success((editResponse) => {
                    resolve(editResponse);
                })
                .error((editError) => {
                    reject(editError);
                });
        });
    };

    return {
        getBoardList: getBoardList,
        postNewBoard: postNewBoard,
        deleteBoard: deleteBoard,
        getSingleBoard: getSingleBoard,
        editBoard: editBoard
    };

});
