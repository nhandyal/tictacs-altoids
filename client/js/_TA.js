/**
 * Description : Global functions and data for the tictacs and altoids app
 */

 (function(){

    var TA = {};

    TA["data"] = {
        game_data : function() {
            var game_board = {
                parent_board : [
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 0
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 1
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 2
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 3
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 4
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 5
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 6
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 7
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        index : 8
                    }
                ],
                game_moves : [],
                
                // on create player data is keyed generically with 0 and 1
                // after a player is assigned to the game, replace the key
                // with the users session key.
                player_data : {
                    0 : {
                        xo_element : '-',
                        username : ""
                    },
                    1 : {
                        xo_element : '-',
                        username : ""
                    }
                }
            };

            return game_board;
        },

        xo_targets_to_show : []
    };

    TA["functions"] = {

        push_window_history : function(state_data, description, path) {
            window.history.pushState(state_data, description, path);
        },

        rekey_player_data : function(game_data, generic_key, _sguid, xo_element) {
            // this function should never be called with username === undefined
            delete game_data.player_data[generic_key];
            game_data.player_data[_sguid] = {
                xo_element : xo_element,
                username : Session.get("username")
            };
        },

        create_new_game_and_push_history : function() {
            var new_game_data = new TA.data.game_data();
                game_id = "";

            // the player to create the game is X, the next player to join is O
            TA.functions.rekey_player_data(new_game_data, 0, Session.get("_sguid"), 'X');
            
            game_id = Games.insert(new_game_data);
            TA.functions.push_window_history({"game_id" : game_id}, "tictacs & altoids : " + game_id, "/" + game_id);

            return game_id;
        },

        process_xo_elements : function() {
            var xo_targets_to_show = TA.data.xo_targets_to_show;
            for(var i = 0; i < xo_targets_to_show.length; i++) {
                var xo_element_id = xo_targets_to_show.splice(0, 1);
                $("#"+xo_element_id+" > .XO-container").addClass("full-opacity");
            }
        },

        check_localStorage_for : function(key) {
            var storage_value = localStorage.getItem(key);
            if(storage_value !== null) {
                Session.set(key, storage_value);
            }
            return storage_value;
        },

        set_localStorage : function(key, value) {
            debugger;
            localStorage.setItem(key, value);
            Session.set(key, value);
        },

        getCurrentUser : function() {
            var user = Meteor.user(),
                user_email = "";

            if(user === null || typeof user === "undefined"){
                return;
            }

            user_email = user.emails[0].address;
            user_email = user_email.substring(0, user_email.indexOf('@')).toUpperCase();
            return user_email;
        }
    };
    
    window["TA"] = TA;

 })();