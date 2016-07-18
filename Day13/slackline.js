var app = angular.module("tensionApp", ["ngRoute", "firebase"])

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: "MainCtrl",
		templateUrl: "templates/slackline.html",
		resolve: {

     		"currentAuth": function($firebaseAuth) {
       		return $firebaseAuth().$requireSignIn();
     		}
   		}
	})
	$routeProvider.when('/signup',{
		controller: "SignUpCtrl",
		templateUrl: "templates/signup.html",
	})
	$routeProvider.when('/login', {
		controller: "LogInCtrl",
		templateUrl: "templates/login.html",
	})
	$routeProvider.when('/list', {
		controller: "ListCtrl",
		templateUrl: "templates/list.html",	
		resolve: {

     		"currentAuth": function($firebaseAuth) {
       		return $firebaseAuth().$requireSignIn();
     		}
   		}
	})
	$routeProvider.when('/channel/:channelId', {
		controller: "ChannelCtrl",
		templateUrl: "templates/general.html",
		resolve: {

     		"currentAuth": function($firebaseAuth) {
       		return $firebaseAuth().$requireSignIn();
     		}
   		}
	})
});

app.run(["$rootScope", "$location", function($rootScope, $location) {
 $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
   // We can catch the error thrown when the $requireSignIn promise is rejected
   // and redirect the user back to the home page
   if (error === "AUTH_REQUIRED") {
     $location.path("/login");
   }
 });
}]);

	//this Ctrl is dead im pretty sure
// app.controller("MainCtrl", function($scope, $http, $firebaseArray, $firebaseAuth, $location, currentAuth) {
// 	var ref = firebase.database().ref().child("messages");
// 	$scope.messages = $firebaseArray(ref);
// 	console.log($scope.messages);

// 	$scope.makeMessage = function() {
// 		console.log("I work");
// 		$scope.messages.$add ({
// 			text: $scope.newMessage,
// 			sender: $scope.currUser,
// 			created_at: Date.now()
// 		});
// 		$scope.newMessage = "";
// 	};
// 	console.log($scope.newMessageText);

// 	$scope.currUser = currentAuth.uid;

// 	console.log($scope.currUser);

// 	$scope.authObj = $firebaseAuth();
    
//     $scope.signOut= function(){
//     $scope.authObj.$signOut();
//     $location.path("/login")}
// });
app.controller("ChannelCtrl", function($scope, $http, $firebaseArray, $firebaseObject, $firebaseAuth, $location, $routeParams, currentAuth) {
	var ref = firebase.database().ref().child("messages").child($routeParams.channelId);
	$scope.messages = $firebaseArray(ref);
	console.log($scope.messages);
	$scope.userId = currentAuth.uid;

	var userRef = firebase.database().ref().child('users');
	$scope.users=$firebaseObject(userRef);
			// $scope.user.name=$scope.name;
			// $scope.user.$save();

	$scope.makeMessage = function() {
		console.log("I work");
		$scope.messages.$add ({
			text: $scope.newMessage,
			sender: $scope.userId,
			created_at: Date.now()
		});
		console.log($scope.user);
		console.log($scope.userId);
		$scope.newMessage = "";
		$scope.users[$scope.userId].name;
	};
	console.log($scope.newMessageText);


	$scope.authObj = $firebaseAuth();
    
    $scope.signOut= function(){
    $scope.authObj.$signOut();
    $location.path("/login")}
});

app.controller("SignUpCtrl", function($scope, $http, $route, $firebaseObject, $firebaseArray,$routeParams,$firebaseAuth, $location)
{
	$scope.authObj = $firebaseAuth();
	$scope.signUp= function(){
		console.log($scope.name+ $scope.email + $scope.password);

		
		console.log($scope.authObj);
		$scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser) {
			console.log("User " + firebaseUser.uid + " created successfully!");
			var userRef= firebase.database().ref().child("users").child(firebaseUser.uid);

			$scope.users=$firebaseObject(userRef);
			$scope.users.name=$scope.name;
			$scope.users.email = $scope.email;
			$scope.users.password = $scope.password;
			$scope.users.$save();


			$location.path("/list");
		}).catch(function(error) {
			console.error("Error: ", error);
		});
	};
});
app.controller("ListCtrl", function($scope, $firebaseArray){
    var ref = firebase.database().ref().child("channels");
    $scope.channels = $firebaseArray(ref);

    console.log($scope.channels);
    $scope.signOut= function(){
    	$scope.authObj.$signOut();
    	$location.path("/login")
    };
});



app.controller("LogInCtrl", function($scope, $http, $route, $firebaseObject, $firebaseArray,$routeParams,$firebaseAuth, $location)
{

	$scope.logIn= function(){
		console.log($scope.name+ $scope.email + $scope.password);

		$scope.authObj = $firebaseAuth();
		console.log($scope.authObj);
		$scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser) {
			console.log( firebaseUser.uid + " logged in successfully!");
			var userRef= firebase.database().ref().child("users").child(firebaseUser.uid);

			$scope.users=$firebaseObject(userRef);
			$scope.users.name=$scope.name;
			$scope.users.$save();

			$location.path("/list");
		}).catch(function(error) {
			console.error("Error: ", error);
		});
	};
});