/*globals define*/
define(['underscore'], function(_){
    'use strict';
    var sorter;
    sorter = (function(){
        var sortByTitle = function sortByTitle(posts){
            var sortedPosts =  _.sortBy(posts, function(post){
                return post.title.toLowerCase();
            });
            return sortedPosts;
        };

        var sortByDate = function sortByDate(posts){
            var sortedPosts =  _.sortBy(posts, function(post){
                return Date.parse(post.postDate);
            });
            return sortedPosts;
        };

        var sortByDateDescending = function sortByDate(posts){
            var sortedPosts =  _.sortBy(posts, function(post){
                return -Date.parse(post.postDate);
            });
            return sortedPosts;
        };

        var sortByTitleDesc = function sortByDate(posts){
            var sortedPosts =  posts.sort(function(a, b){
                if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            });
            return sortedPosts;
        };

        return{
            sortByTitle: sortByTitle,
            sortByDate: sortByDate,
            sortByDateDescending: sortByDateDescending,
            sortByTitleDesc: sortByTitleDesc
        };
    }());
    return sorter;
});