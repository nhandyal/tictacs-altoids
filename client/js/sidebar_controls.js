var create_new_game_type = null;

Template.sidebar_controls.helpers({
    session_username : function() {
        return Session.get("username");
    },

    session_username_set : function() {
        return typeof Session.get("username") !== "undefined";
    },

    username_input_attributes : function() {
        return {
            id : "input_username",
            name : "username",
            placeholder : "insert username",
            type : "text",
            autofocus : "true",
            autocomplete : "off",
            required : "required"
        }
    }
});

Template.sidebar_controls.events({
    'click .game-select-icon' : function(e) {
        create_new_game_type = e.target.id;
    },

    'submit #create_new_game' : function(e) {
        e.preventDefault;

        var username = $("#input_username").val();
        debugger;
        if(typeof username !== "undefined") {
            TA.set_localStorage("username", username);

            // we should already have the submit button id
            debugger;
            if(create_new_game_type != null) {
                debugger;
                TA.functions.set_localStorage("username", username);
                console.log("why is this not executing")
                TA.functions.create_new_game_and_push_history();
                console.log("creating a " + create_new_game_type);
            }
        }

        create_new_game_type = null;
        return false;
    }
});