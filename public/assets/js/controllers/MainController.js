app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    $scope.commentVis = false;

    $scope.getArticles = function () {
        $http.get('/articles').then(function successCallback(response) {

            $scope.articles = response.data;
        }, function failCallback(error) {
            console.log(error)
        });
    };
    $scope.getArticles();

    $scope.showComments = function (id) {
        console.log('article id', id);
        $scope.commentVis = true;
        $http.get('/articles/' + id).then(function successCallback(response) {

            $scope.comments = response.data.comments;
            console.log($scope.comments);
            $scope.articleId = response.data._id;

        }, function failCallback(error) {
            console.log(error);
        })
    };

    $scope.saveComment = function (id) {

        $http.post('/articles/' + id, {
            title: $scope.title,
            body: $scope.body
        }).then(function successCallback(response) {

            $scope.title = "";
            $scope.body = "";
            $scope.showComments(id);
            $scope.getArticles();

        }, function failCallback(error) {
            console.log(error);
        })
    };

    $scope.deleteComment = function (id, commentId) {
        $http.post('/comments/', {
            id: commentId
        })
            .then(function successCallback(response) {

                $scope.showComments(id);
                $scope.getArticles();


            }, function failCallback(error) {
                console.log(error);
            });

    }


}]);