app.controller('MainController', ['$scope','$http', function($scope, $http) {

    $scope.commentVis = false;

    $http.get('/articles').then(function successCallback(response) {

        $scope.articles = response.data;
    }, function failCallback(error) {
        console.log(error)
    });


    $scope.showComments = function(id) {

        $scope.commentVis = !$scope.commentVis;

        $http.get('/articles/' + id).then(function successCallback(response) {

            $scope.comments = response.data.comments;
            $scope.commentId = response.data._id;

        }, function failCallback(error) {
            console.log(error);
        })
    };

    $scope.saveComment = function(id) {

        $http.post('/articles/' +id, {title: $scope.title, body: $scope.body}).then(function successCallback(response) {

            $scope.title = "";
            $scope.body = "";
            showComments(id);

        }, function failCallback(error) {
            console.log(error);
        })
    }



}]);