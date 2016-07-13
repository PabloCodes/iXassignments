
var app=angular.module("ChommiesApp",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'FeedCtrl',
        templateUrl: 'templates/home.html',
    })
    $routeProvider.when('/myProps', {
        controller: 'PropsCtrl',
        templateUrl: 'templates/myProps.html'
    })
});
app.controller('PropsCtrl', function($scope, $http) {
    $http ({
        url: "http://ixchommies.herokuapp.com/props/me",
        method: "GET",
        params: {
            token: "b005daad635de5df7f9623928d6ac2e6"
        }
    }).then(function(response) {
        console.log(response);
        $scope.myProps = response.data
    });
    $http ({
        url: "http://ixchommies.herokuapp.com/brus",
        method: "GET",
        params: {
            token: "b005daad635de5df7f9623928d6ac2e6"
        }
    }).then(function(response) {
        console.log(response);
        $scope.brus= response.data;
        
    });
});
app.controller('FeedCtrl', function($scope, $http) {
    $scope.ChommiesRocks = "Welcome to Chommie, Homie.";
    $scope.isSending = false;
    $http ({
        url: "http://ixchommies.herokuapp.com/props",
        method: "GET",
        params: {    
            token: "b005daad635de5df7f9623928d6ac2e6"
        }
    }).then(function(response) {
        console.log(response);
        $scope.props = response.data;
    });
    $http ({
        url: "http://ixchommies.herokuapp.com/brus",
        method: "GET",
        params: {
            token: "b005daad635de5df7f9623928d6ac2e6"
        }
    }).then(function(response) {
        console.log(response);
        $scope.brus= response.data;
        
    });
    $scope.sendProps = function() {
        $scope.isSending = true;
        $scope.errorMessage= "";
        console.log("bru",$scope.selectedBru);
        console.log($scope.newPropsValue);
        console.log("testing here");
        $http ({
            url: "http://ixchommies.herokuapp.com/props",
            method: "POST",
            params: {
                token: "b005daad635de5df7f9623928d6ac2e6",
            },
            data: {
                for: $scope.selectedBru,
                props: $scope.newPropsValue    
            }
            }).then(function(response) {
                console.log("it's working!!");
                $scope.props.unshift(response.data);
                $scope.newPropsValue = "";
            }).catch(function(response){
                console.log(response)
                $scope.errorMessage = response.data.message;
            }).finally(function(response){
                $scope.isSending = false;
            })
    }
    
});