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
        .when('/items/list', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl',
            resolve: {isAuth}
        })
        .when('/items/new', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemNewCtrl',
            resolve: {isAuth}
        })
        .when('/items/view/:id', { // colon means the value will change
            templateUrl: 'partials/item-view.html',
            controller: 'ItemViewCtrl',
            resolve: {isAuth}
        })
        .when('/items/edit/:id', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemEditCtrl',
            resolve: {isAuth}
        })
        .when('/logout', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl',
            resolve: {isAuth}
        })
        .otherwise('/auth'); // This could be a 404 error...

});