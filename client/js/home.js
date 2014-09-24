var email_input_id = "landing-input-email",
    pwd_input_id = "landing-input-pwd";

Template.home.helpers({
    show_login_register_container : function() {
        return typeof Session.get("landing_login_register_intent") !== "undefined";
    },

    email_input_attributes : function() {
        return {
            id : email_input_id,
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
            id : pwd_input_id,
            class : "landing-text-input-element",
            name : "password",
            placeholder : "password",
            type : "password",
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
    },

    'click #landing-login-register-submit' : function(e) {
        var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            email = $.trim($("#"+email_input_id).val()),
            pwd = $.trim($("#"+pwd_input_id).val()),
            valid_email = email_regex.test(email),
            valid_pwd = (pwd != ""),
            intent = $.trim($("#landing-login-register-submit").html()).toLowerCase();

        if(!valid_email) {
            // flash the email field 3 times
            (function() {
                var toggle_count = 0,
                    interval = setInterval(function() {
                        $("#"+email_input_id).toggleClass("landing-color-alert");
                        toggle_count++;
                        if(toggle_count == 6) {
                            clearInterval(interval);
                        }
                    }, 300);
            })();
            return;
        }

        if(!valid_pwd) {
            // flash the pwd field 3 times
            $("#"+pwd_input_id).val('');
            (function() {
                var toggle_count = 0,
                    interval = setInterval(function() {
                        $("#"+pwd_input_id).toggleClass("landing-color-alert");
                        toggle_count++;
                        if(toggle_count == 6) {
                            clearInterval(interval);
                        }
                    }, 300);
            })();
        }

        // passed input validation
        if(intent == "register") {
            Accounts.createUser({
                username : chance.guid(),
                email : email,
                password : pwd,
                profile : {}
            }, function(error) {
                if(error) {
                    console.log(error);
                    return;
                }

                console.log("created successfully");
            });
        }else if(intent == "login") {
            console.log("login");
        }else {
            console.log("unknown intent");
        }

    }
});