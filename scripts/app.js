/*globals require, alert, console*/
(function () {
    'use strict';
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1',
            mustache: 'libs/mustache',
            q: 'libs/q',
            sammy: 'libs/sammy',
			underscore: 'libs/underscore',
            basePersister: 'accessModules/basePersister',
            dataPersister: 'accessModules/dataPersister',
            loginPersister: 'accessModules/loginPersister',
            userPersister: 'accessModules/userPersister',
            encrypter: 'modules/encrypter',
            requester: 'modules/requester',
            controller: 'controller/controller',
            ui: 'UI/UI',
            sorter: 'modules/sorter'
        }
    });

    require(['sammy', 'jquery', 'controller'], function (Sammy, $, PostController) {
        var postApp = new PostController('#main-content', 'http://localhost:3000/');
        postApp.addEvents();

        var app = Sammy('#main-content', function () {
            this.get('#/', function () {
                postApp.loadHome();
            });
            this.get('#/login', function () {
                postApp.loadLogin();
            });

            this.get('#/posts', function () {
                postApp.loadPosts();
            });

            this.get('#/register', function () {
                postApp.loadRegister();
            });

            this.get('#/logout', function () {
                postApp.loadLogout();
            });

        });

        $(function() {
            app.run('#/');
        });
    });
}());
