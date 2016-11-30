"use strict";

app.controller("NavCtrl", ($scope) => {
    $scope.navItems = [{name: "Logout", url: "#/logout"},
    {name:"New Board", url: "#/boards/new"},
    {name:"My Boards", url: "#/boards/list"},
    {name:"New Pin", url: "#/pins/new"},
    {name:"All Pins", url: "#/allpins/list"}];
});
