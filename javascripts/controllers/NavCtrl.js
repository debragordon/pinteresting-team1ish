"use strict";

app.controller("NavCtrl", ($scope) => {
    $scope.navItems = [{name: "Logout", url: "#/logout"},
    {name:"All Pins", url: "#/pins/list"},
    {name:"My Boards", url: "#/boards/list"},
    {name:"New Pin", url: "#/pins/new"}];
});
