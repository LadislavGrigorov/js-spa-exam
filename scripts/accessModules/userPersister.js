/*globals define*/
define(['encrypter', 'requester'], function (encrypter, requester) {
    var UserPersister;
    UserPersister = (function(){
        function UserPersister(resourceURL){
            this.resourceURL = resourceURL;
        }

        UserPersister.prototype.register = function(username, password){
            var self = this;
            var encryptedPassword = encrypter.SHA1(username + password);
            return requester.postJSON(self.resourceURL, {
                username: username,
                authCode: encryptedPassword
            });
        };

        UserPersister.prototype.logout = function(){
            var self = this;
            var sesionKey = localStorage.getItem("sessionKey");
            return requester.putJSON(self.resourceURL, sesionKey)
                .then(function(success){
                    console.log(success);
                    localStorage.setItem("sessionKey", '');
                });
        };

        return UserPersister;
    }());
    return UserPersister;
});
