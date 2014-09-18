Meteor.startup(function () {
    
    Meteor.publish("games", function(id) {
        return Meteor.games.find({}, {_id : id});
    });

});