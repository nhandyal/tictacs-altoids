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
    
});