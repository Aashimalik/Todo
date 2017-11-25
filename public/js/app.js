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

app.run(function(){
    console.log("app.run running");
});


app.controller("Acontroller",function($scope,$http,$location){
    $scope.submitForm=function(){
console.log($scope.email); // both are returning undefined
console.log($scope.password);
 $http({
     url:'/registration',
     method:'POST',
     data:$scope.body
 }).then(function(res){
    $location.path('/createTodo')
    console.log(res)
 },function(response){
     console.log(res)
    })
    }
})
 
app.controller('loginController',function($scope,$http,$rootScope,$location){
    console.log("login controller load");
    $scope.submitForm=function(){
        $http({
            url:'/login',
            method:'POST',
            data:$scope.body
        }).then(function(res){
           
            $scope.tokenChk=window.localStorage.setItem('token', res.data.token)
            $location.path('/todo');
            console.log(localStorage.getItem('token'));
            console.log(res);
        },function(res){
 console.log(res);
        })
    }
})

app.controller('createTodo',function($scope,$http,$location){
    console.log("create to do controller loaded");
    console.log(localStorage.getItem('token'))
    $scope.submitForm=function(){
        $http({
            url:'/api/createTodo',
            method:'POST',
            data:$scope.body,
            headers:{
                'x-access-token':window.localStorage.getItem('token')
            }
        }).then(function(res){
            $location.path('/todo');
            console.log($scope.body.name);
            console.log(res);
        },function(res){
            console.log(res);
        })
}
})

app.controller('showtodo',function($scope,$http){

    console.log("show all  todo controller loaded", localStorage.token);
        $http({
            url:'/api/todo',
            method:'GET',
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        }).then(function(res){
        console.log(res.data.data);
        $scope.taskArray=res.data.data;
            console.log(res);
        },function(res){
            
 console.log(res);
        })
});



app.controller('/api/checkTodo',function($scope,$http){
    console.log("show all  todo controller loaded");
        $http({
            url:'/api/todo',
            method:'GET',
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        }).then(function(res){
        console.log(res.data.data);
        $scope.taskArray=res.data.data;
            console.log(res);
        },function(res){
 console.log(res);
        })
});

