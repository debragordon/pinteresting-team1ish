"use strict";

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if(AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.run(($rootScope, $location, FIREBASE_CONFIG, AuthFactory) => {
     firebase.initializeApp(FIREBASE_CONFIG);

     $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {

        let logged = AuthFactory.isAuthenticated();
        let appTo;

        if(currRoute.originalPath) {
            appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        }

        if(!appTo && !logged) {
            event.preventDefault();
            $location.path('/auth');
        }

     });
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/auth', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl'
        })
        .when('/boards/new', {
            templateUrl: 'partials/board-new.html',
            controller: 'BoardNewCtrl',
            resolve: {isAuth}
        })
        .when('/boards/list', {
            templateUrl: 'partials/board-list.html',
            controller: 'BoardNewCtrl',
            resolve: {isAuth}
        })
        .when('/boards/view/:id', { // colon means the value will change
            templateUrl: 'partials/board-view.html',
            controller: 'BoardViewCtrl',
            resolve: {isAuth}
        })
        .when('/boards/edit/:id', {
            templateUrl: 'partials/board-new.html',
            controller: 'BoardEditCtrl',
            resolve: {isAuth}
        })
        .when('/pins/list', {
            templateUrl: 'partials/pin-list.html',
            controller: 'PinListCtrl',
            resolve: {isAuth}
        })
        .when('/pins/new', {
            templateUrl: 'partials/pin-new.html',
            controller: 'PinNewCtrl',
            resolve: {isAuth}
        })
        .when('/pins/view/:id', { // colon means the value will change
            templateUrl: 'partials/pin-view.html',
            controller: 'PinViewCtrl',
            resolve: {isAuth}
        })
        .when('/pins/edit/:id', {
            templateUrl: 'partials/pin-new.html',
            controller: 'PinEditCtrl',
            resolve: {isAuth}
        })
        .when('/logout', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl',
            resolve: {isAuth}
        })
        .otherwise('/auth'); // This could be a 404 error...

});
