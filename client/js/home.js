Template.home.helpers({
    show_login_register_container : function() {
        return typeof Session.get("landing_login_register_intent") !== "undefined";
    },

    email_input_attributes : function() {
        return {
            id : "landing-input-email",
            class : "landing-text-input-element",
            name : "email",
            placeholder : "email",
            type : "text",
            autofocus : "true",
            autocomplete : "off",
            required : "required",
            style : "margin-right: 10px;"
        }
    },

    pwd_input_attributes : function() {
        return {
            id : "landing-input-pwd",
            class : "landing-text-input-element",
            name : "password",
            placeholder : "password",
            type : "text",
            autocomplete : "off",
            required : "required"
        }
    },

    login_register_intent : function() {
        return Session.get("landing_login_register_intent");
    }
});

Template.home.events({
    'click .landing-login-register-submit' : function(e) {
        var target_id = e.target.id;
        if(target_id == "landing-login-select") {
            Session.set("landing_login_register_intent", "login");
            TA.functions.push_window_history({}, "login", "/login");
        }else if(target_id == "landing-register-select") {
            Session.set("landing_login_register_intent", "register");
            TA.functions.push_window_history({}, "register", "/register");
        }
    }
});