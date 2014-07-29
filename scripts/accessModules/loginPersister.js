/*globals define*/
define(['encrypter', 'requester'], function (encrypter, requester) {
    var LoginPersister;
    LoginPersister = (function(){
        function LoginPersister(resourceURL){
            this.resourceURL = resourceURL;
        }

        LoginPersister.prototype.login = function(username, password){
            var self = this;
            var encryptedPassword = encrypter.SHA1(username + password);
            return requester.postJSON(self.resourceURL, {
                username: username,
                authCode: encryptedPassword
            });

        };

        return LoginPersister;
    }());
    return LoginPersister;
});
