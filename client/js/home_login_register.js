var email_input_id = "landing-input-email",
    pwd_input_id = "landing-input-pwd",
    default_email_placeholder = "email";


function preprocessRegisterLoginIntent() {
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
        return;
    }

    // passed input validation
    if(intent == "register") {
        processRegisterIntent(email, pwd);
    }else if(intent == "login") {            
        processLoginIntent(email, pwd);
    }else {
        console.log("unknown intent");
    }
};


function processRegisterIntent(email, pwd) {
    Accounts.createUser({
        email : email,
        password : pwd,
        profile : {}
    }, function(error) {
        if(error) {
            if(error.error == 403) {
                // duplicate email
                $("#"+email_input_id).val('');
                $("#"+pwd_input_id).val('');
                $("#"+email_input_id).attr("placeholder", "email already in use");
                (function() {
                    var toggle_count = 0,
                        interval = setInterval(function() {
                            $("#"+email_input_id).toggleClass("landing-color-alert");
                            toggle_count++;
                            if(toggle_count == 6) {
                                clearInterval(interval);
                                $("#"+email_input_id).attr("placeholder", default_email_placeholder);
                            }
                        }, 300);
                })();
            }else {
                // TODO : display default error message
            }

            return;
        }

        // successfull registration
        $("#landing-content").css({ opacity: 0 });
        Router.go("/");
        setTimeout(function() {
            $("#landing-content").fadeTo(250, 1);
        }, 1000);
    });
};


function processLoginIntent(email, pwd) {
    Meteor.loginWithPassword({email : email}, pwd, function(error) {
        if(error) {
            $("#"+email_input_id).val('');
            $("#"+pwd_input_id).val('');
            if(error.error == 403){
                (function() {
                    var toggle_count = 0,
                    interval = setInterval(function() {
                        $("#"+email_input_id).toggleClass("landing-color-alert");
                        $("#"+pwd_input_id).toggleClass("landing-color-alert");
                        toggle_count++;
                        if(toggle_count == 6) {
                            clearInterval(interval);
                        }
                    }, 300);
                })();
            }else {
                // TODO: display default error message
            }

            return;
        }

        // successfull login
        $("#landing-content").css({ opacity: 0 });
        Router.go("/");
        setTimeout(function() {
            $("#landing-content").fadeTo(250, 1);
        }, 1000);
    });
};


Template.home_login_register.helpers({
    show_login_register_container : function() {
        return typeof Session.get("landing_login_register_intent") !== "undefined";
    },

    email_input_attributes : function() {
        return {
            id : email_input_id,
            class : "landing-text-input-element",
            name : "email",
            placeholder : default_email_placeholder,
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


Template.home_login_register.events({

    'keyup #landing-login-register-container' : function(e) {
        if(e.keyCode == 13) {
            preprocessRegisterLoginIntent();
        }
    },

    'click .landing-login-register-submit' : function(e) {
        var target_id = e.target.id;
        if(target_id == "landing-login-select") {
            Session.set("landing_login_register_intent", "login");
            Router.go("/login");
        }else if(target_id == "landing-register-select") {
            Session.set("landing_login_register_intent", "register");
            Router.go("/register");
        }
    },

    'click #landing-login-register-submit' : function(e) {
        preprocessRegisterLoginIntent();
    }
    
});