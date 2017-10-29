const app=angular.module('myapp',['ngRoute','ngMessages']);
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'views/registration.html',
        controller:'Acontroller'
    });
    $routeProvider.when('/login',{
        templateUrl:'views/login.html',
        controller:'loginController'
    });
    $routeProvider.when('/createTodo',{
        templateUrl:'views/createTodo.html',
        controller:'createTodo'
    });
    $routeProvider.when('/todo',{
        templateUrl:'views/showtodo.html',
        controller:'showtodo'
    })
    $locationProvider.html5Mode(true);	
})
app.controller("Acontroller",function($scope,$http){
    $scope.submitForm=function(){
console.log($scope.email); // both are returning undefined
console.log($scope.password);
 $http({
     url:'/registration',
     method:'POST',
     data:$scope.body
 }).then(function(res){
    console.log(res)
 },function(response){
     console.log(res)
    })
    }
})

app.controller('loginController',function($scope,$http){
    console.log("login controller load");
    $scope.submitForm=function(){
        $http({
            url:'/login',
            method:'POST',
            data:$scope.body
        }).then(function(res){
            console.log(res);
        },function(res){
 console.log(res);
        })
    }
})

app.controller('createTodo',function($scope,$http){
    console.log("create to do controller loaded");
    $scope.submitForm=function(){
        console.log($scope.name); // both are returning undefined
        $http({
            url:'/createTodo',
            method:'POST',
            data:$scope.body
        }).then(function(res){
            console.log(res);
        },function(res){
 console.log(res);
        })
}
})

app.controller('showtodo',function(){
    console.log("show all  todo controller loaded");
        $http({
            url:'/todo',
            method:'GET'
        }).then(function(res){
            console.log(res);
        },function(res){
 console.log(res);
        })
})