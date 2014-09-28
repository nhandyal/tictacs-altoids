/*---------------- STARTUP LOGIC ----------------*/

// set the user's sguid if currently unset
var _sguid = TA.functions.check_localStorage_for("_squid");
if(typeof _sguid === 'undefined') {
    TA.functions.set_localStorage("_sguid", chance.guid());
}

Template.registerHelper('current_user', function() {
    return TA.functions.get_current_user_email();
});

Template.registerHelper('logged_in', function() {
    return Meteor.user() !== null;
});

Template.registerHelper('not_logged_in', function() {
    return Meteor.user() === null;
});

Meteor.startup(function() {
    // is called after templates are rendered
    delete Session.keys['landing_login_register_intent'];
    TA.functions.check_localStorage_for("username");
});

window.addEventListener('popstate', function(event) {
    //popstate fired
    console.log("popstate fired", event);
    var path = window.location.pathname;
    if(path == "/") {
        Session.set('landing_login_register_intent', undefined);
    }
});