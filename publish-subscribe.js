var pubSub = {};
(function (myObject) {
    var topics = {};
    var SubUid = -1;
    myObject.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = []
        }
        var tocken = (++SubUid).toString();
        topics[topic].push(
            {
                tocken: tocken,
                func: func
            }
        );
        return tocken;
    }
    myObject.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    }
})(pubSub);