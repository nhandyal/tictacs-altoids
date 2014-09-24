/*---------------- STARTUP LOGIC ----------------*/

// set the user's sguid if currently unset
var _sguid = TA.functions.check_localStorage_for("_squid");
if(typeof _sguid === 'undefined') {
    TA.functions.set_localStorage("_sguid", chance.guid());
}


// path: /<game_id>
var path = window.location.pathname;
if(path != "/") {
    Session.set("game_id", path.replace("/", ""));
}


Meteor.startup(function() {
    // is called after templates are rendered

    TA.functions.check_localStorage_for("username");

    /*
    // Check if something was changed on mongo
    // after a game is created, we should never have this code execute
    // recovery if it happens is to redirect the user home
    var db_game_object = Games.findOne({_id : Session.get("game_id")});
    if(typeof db_game_object === "undefined") {
        console.log("db game object is undefined");
    }
    */
});