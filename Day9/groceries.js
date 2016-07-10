var app = angular.module('listApp', []); 

app.controller('ListCtrl', function($scope) {
  $scope.todos = [];
  
  $scope.addTodo = function() {
    if ($scope.checkIt($scope.todoName, $scope.dueDate) === false) {
      if ($scope.todoName === NaN){
        return;
      } 
      var newTodo = {
        "name": $scope.todoName.toLowerCase(),
        "dueDate": $scope.dueDate.toLowerCase(),
        "isEditing" : false
      };
      $scope.todos.push(newTodo);
    };
    $scope.todoName = "";
    $scope.dueDate = "";
  };
  $scope.addOne = function(todo) {
   var itemNumber = parseInt(todo.dueDate);
   todo.dueDate = itemNumber+1;
 };
 $scope.subtractOne = function(todo){
   var itemNumber = parseInt(todo.dueDate);
   todo.dueDate = itemNumber - 1;
 };
 $scope.checkIt = function(todoName, dueDate){
   for (var i=0; i<$scope.todos.length; i++){
    if ($scope.todos[i].name === todoName.toLowerCase()){
     var itemNumber = parseInt($scope.todos[i].dueDate);
     var newNumber = parseInt(dueDate);
     $scope.todos[i].dueDate = itemNumber + newNumber;
     return true;
   };
 };	
 return false;
};
$scope.delete = function(i){
  $scope.todos.splice(i,1);
};
$scope.empty = function(todo){
  $scope.todos.length=0;
}
});