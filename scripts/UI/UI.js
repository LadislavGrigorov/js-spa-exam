/*globals define*/
define(['jquery', 'mustache'], function ($, Mustache) {
    'use strict';
    var UI;
    UI = (function () {
        function UI(selector) {
            this.selector = selector;
        }

        UI.prototype.renderHome = function () {
            $(this.selector).load('templates/wellcome.html');
        };

        UI.prototype.renderLogin = function () {
            $(this.selector).load('templates/login.html');
        };

        UI.prototype.renderLoginDone = function () {
            $(this.selector).load('templates/loggedin.html');
        };

        UI.prototype.renderError = function (errCode, errMessage) {
            var error = $('<p>').html(errCode + ' - ' + errMessage);
            $(this.selector).html(error);
        };

        UI.prototype.renderLogout = function () {
            $(this.selector).load('templates/logout.html');
        };

        UI.prototype.renderLogoutDone = function () {
            $(this.selector).load('templates/logoutdone.html');
        };

        UI.prototype.renderRegister = function () {
            $(this.selector).load('templates/register.html');
        };

        UI.prototype.renderNowLogin = function () {
            $(this.selector).load('templates/registered.html');
        };

        UI.prototype.renederPosts = function () {
            return $(this.selector).load('templates/posts.html');
        };

        UI.prototype.renederGivenPosts = function (posts, postsContainer) {
            var template = $('#messages-template').html();
            var $container = $('<ul>').attr('id', 'posts-list');
            Mustache.parse(template);
            for (var i = 0; i < posts.length; i++) {
                var rendered = Mustache.render(template, posts[i]);
                $container.append(rendered);
            }
            $(postsContainer).html($container);
        };

        UI.prototype.renderSuccesPost= function(){
            $('#response').show().html('Post added successfully').fadeOut(1500);
        };
        return UI;
    }());
    return UI;
});
