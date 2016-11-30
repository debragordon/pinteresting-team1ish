"use strict";

app.factory("PinFactory", function($q, $http, FIREBASE_CONFIG) {

    var getPinList = function(userId, boardId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userpins.json?orderBy="boardid"&equalTo="${boardId}"`)
            .success((response) => {
                let pins = [];
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    pins.push(response[key]);
                });
                resolve(pins);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    var getAllPins = function() {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json`)
            .success((response) => {
                let pins = [];
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    pins.push(response[key]);
                });
                resolve(pins);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    var postNewPin = function(newPin, boardId) {
      console.log("boardId1", boardId);
        return $q((resolve, reject)  => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`,
                    JSON.stringify({
                        title: newPin.title,
                        url: newPin.url,
                        uid: newPin.uid
                    })
                )
            .success((postResponse) => {
              console.log({postResponse});
              console.log("boardId2", boardId);
              postNewPinToBoard(newPin, boardId);
                resolve(postResponse);
            })
            .error((postError) => {
                reject(postError);
            });
        });
    };

    var postNewPinToBoard = function(newPin, boardId) {
        return $q((resolve, reject)  => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/userpins.json`,
                    JSON.stringify({
                        boardid: boardId,
                        title: newPin.title,
                        url: newPin.url,
                        uid: newPin.uid
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

    var deletePin = function(pinId) {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
            .success((deleteResponse) => {
                resolve(deleteResponse);
            })
            .error((deleteError) => {
                reject(deleteError);
            });
        });
    };

    var deleteBoardPin = function(pinId) {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/userpins/${pinId}.json`)
            .success((deleteResponse) => {
                resolve(deleteResponse);
            })
            .error((deleteError) => {
                reject(deleteError);
            });
        });
    };

    var getSinglePin = function(pinId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
            .success((getSingleResponse) => {
                resolve(getSingleResponse);
            })
            .error((getSingleError) => {
                reject(getSingleError);
            });
        });
    };

    var editPin = function(editPin) {
        console.log("factory edit", editPin);
        return $q((resolve, reject)  => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/pins/${editPin.id}.json`,
                    JSON.stringify({
                        assignedTo: editPin.assignedTo,
                        isCompleted: editPin.isCompleted,
                        task: editPin.task,
                        uid: editPin.uid
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

    return {getPinList: getPinList,
            postNewPin: postNewPin,
            deletePin: deletePin,
            getSinglePin: getSinglePin,
            editPin: editPin,
            getAllPins: getAllPins,
            postNewPinToBoard: postNewPinToBoard,
            deleteBoardPin: deleteBoardPin
        };

});
