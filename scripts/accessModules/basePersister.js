/*globals define*/
define(['dataPersister', 'loginPersister', 'userPersister'], function(DataPersister, LoginPersister, UserPersister){
    'use strict';
    var BasePersister;
    BasePersister = (function(){
        var ENDPOINTS = {
            user: 'user/',
            data: 'post/',
            login: 'auth/'
        };
        function BasePersister(resourceURL){
            this.resourceURL = resourceURL;
            this.user = new UserPersister(resourceURL + ENDPOINTS.user);
            this.data = new DataPersister(resourceURL + ENDPOINTS.data);
            this.login = new LoginPersister(resourceURL + ENDPOINTS.login);
        }

        BasePersister.prototype.isLoggedIn = function () {
            var sessionKey = localStorage.getItem('sessionKey');
            if (sessionKey) {
                if (sessionKey !== '') {
                    return true;
                }
            }
            return false;
        };

        return {
            get: function(resourceURL){
                return new BasePersister(resourceURL);
            }
        };
    }());
    return BasePersister;
});