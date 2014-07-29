/*globals define*/
define(['jquery', 'basePersister', 'ui', 'sorter'], function ($, BasePersister, UI, sorter) {
    'use strict';
    var PostController;
    PostController = (function () {
        function PostController(selector, resourceURL) {
            this.selector = selector;
            this.resourceURL = resourceURL;
            this.persister = BasePersister.get(resourceURL);
            this.ui = new UI(selector);
        }

        PostController.prototype.loadHome = function () {
            this.ui.renderHome();
        };

        PostController.prototype.loadLogin = function () {
            if (this.persister.isLoggedIn()) {
                this.ui.renderLoginDone();
            } else {
                this.ui.renderLogin();
            }
        };

        PostController.prototype.loadLogout = function () {
            if (this.persister.isLoggedIn()) {
                this.persister.user.logout();
                this.ui.renderLogout();
            } else {
                this.ui.renderLogoutDone();
            }
        };

        PostController.prototype.loadRegister = function () {
            if (this.persister.isLoggedIn()) {
                this.ui.renderLoginDone();
            } else {
                this.ui.renderRegister();
            }
        };

        PostController.prototype.loadPosts = function () {
                this.ui.renederPosts();
        };

        PostController.prototype.addEvents = function () {
            var self = this;
            $(this.selector).on('click', '#login-btn', function () {
                var nickname = $('#input-name').val();
                var password = $('#input-password').val();
                self.persister.login.login(nickname, password)
                    .then(function (data) {
                        localStorage.setItem("sessionKey", data.sessionKey);
                        localStorage.setItem("nickname", nickname);
                        location.reload();
                    }, function (err) {
                        self.ui.renderError(err.responseJSON.errCode, err.responseJSON.message);
                    });

            });

            $(this.selector).on('click', '#login-btn-reg', function () {
                var nickname = $('#input-name-reg').val();
                var password = $('#input-password-reg').val();
                self.persister.user.register(nickname, password)
                    .then(function () {
                        self.ui.renderNowLogin();
                    }, function (err) {
                        console.log(err);
                        self.ui.renderError(err.responseJSON.errCode, err.responseJSON.message);
                    });

            });

            $(this.selector).on('click', '#get-all-posts', function () {
                self.persister.data.getPosts()
                    .then(function(data){
                        self.ui.renederGivenPosts(data, '#posts');
                    });
            });

            $(this.selector).on('click', '#get-all-sorted-title', function () {
                self.persister.data.getPosts()
                    .then(function(data){
                        var posts = sorter.sortByTitle(data);
                        self.ui.renederGivenPosts(posts, '#posts');
                    });
            });

            $(this.selector).on('click', '#get-all-sorted-title-desc', function () {
                self.persister.data.getPosts()
                    .then(function(data){
                        var posts = sorter.sortByTitleDesc(data);
                        self.ui.renederGivenPosts(posts, '#posts');
                    });
            });

            $(this.selector).on('click', '#get-all-sorted-date', function () {
                self.persister.data.getPosts()
                    .then(function(data){
                        var posts = sorter.sortByDate(data);
                        self.ui.renederGivenPosts(posts, '#posts');
                    });
            });

            $(this.selector).on('click', '#get-all-sorted-date-desc', function () {
                self.persister.data.getPosts()
                    .then(function(data){
                        var posts = sorter.sortByDateDescending(data);
                        self.ui.renederGivenPosts(posts, '#posts');
                    });
            });


            $(this.selector).on('click', '#post-message', function () {
                var title = $('#post-title').val();
                var message = $('#post').val();
                if(self.persister.isLoggedIn()){
                    self.persister.data.createPost(title, message)
                        .then(function(data){
                            self.ui.renderSuccesPost();
                        }, function(err){
                            self.ui.renderError(err.responseJSON.errCode, err.responseJSON.message);
                        });
                }
                else{
                    alert('Please login');
                }

            });
        };

        return PostController;
    }());
    return PostController;
});