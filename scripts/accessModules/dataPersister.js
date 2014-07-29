/*globals define*/
define(['requester'], function (requester) {
    var DataPersister;
    DataPersister = (function () {
        function DataPersister(resourceURL) {
            this.resourceURL = resourceURL;
        }

        DataPersister.prototype.createPost = function (title, body) {
            var self = this;
            var sesionKey = localStorage.getItem("sessionKey");
            return requester.postJSONheader(self.resourceURL, {
                title: title,
                body: body
            }, sesionKey);
        };

        DataPersister.prototype.getPosts = function () {
            var self = this;
            return requester.getJSON(self.resourceURL);
        };

        return DataPersister;
    }());
    return DataPersister;
});