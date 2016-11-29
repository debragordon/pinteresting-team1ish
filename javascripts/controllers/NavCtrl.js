"use strict";

app.controller("NavCtrl", ($scope) => {
    $scope.navItems = [{name: "Logout", url: "#/logout"},
    {name:"All Pins", url: "#/allpins/list"},
    {name:"My Boards", url: "#/boards/list"},
    {name:"New Pin", url: "#/pins/new"}];
});
