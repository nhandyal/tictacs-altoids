/*---------------- STARTUP LOGIC ----------------*/

// set the user's sguid if currently unset
Template.registerHelper('current_user', function() {
    return TA.functions.get_current_username();
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
});

window.addEventListener('popstate', function(event) {
    //popstate fired
    console.log("popstate fired", event);
    var path = window.location.pathname;
    if(path == "/") {
        Session.set('landing_login_register_intent', undefined);
    }
});