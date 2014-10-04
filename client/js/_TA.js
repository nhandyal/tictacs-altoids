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
                        email : ""
                    },
                    1 : {
                        xo_element : '-',
                        email : ""
                    }
                }
            };

            return game_board;
        },

        xo_targets_to_show : []
    };

    TA["functions"] = {

        ensure_user_login : function() {
            var user = Meteor.user();
            if(!user) {
                debugger;
                console.log("No logged in user.");
                TA.functions.logout();
                return;
            }

            return user;
        },

        rekey_player_data : function(game_data, generic_key, email, xo_element) {
            var user = TA.functions.ensure_user_login();
            delete game_data.player_data[generic_key];
            game_data.player_data[user.username] = {
                xo_element : xo_element,
                email : email
            };
        },

        create_new_game_and_push_history : function() {            
            var user = TA.functions.ensure_user_login(),
                email = user.emails[0].address,
                new_game_data = new TA.data.game_data(),
                game_id = "",
                target_url = "";

            // the player to create the game is X, the next player to join is O
            TA.functions.rekey_player_data(new_game_data, 0, email, 'X');
            game_id = Games.insert(new_game_data);
            target_url = "/game/" + game_id;
            Router.go(target_url);
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
            localStorage.setItem(key, value);
            Session.set(key, value);
        },

        get_current_user_email : function() {
            var user = Meteor.user(),
                user_email = "";

            if(!user){
                return null;
            }

            user_email = user.emails[0].address;
            user_email = user_email.substring(0, user_email.indexOf('@'));
            return user_email;
        },

        get_game_by_session : function() {
            var game_data = Games.findOne({_id : Session.get("game_id")});

            if(!game_data) {
                console.log("undefined game");
                Router.go("/");
                return;
            }

            return game_data;
        },

        logout : function() {
            Meteor.logout();
            Session.set("landing_login_register_intent", undefined);
            Session.set("username", undefined);
            Router.go("/");
        },

        reset_game_session_state : function() {
            Session.set("this_player_xo_element", undefined);
            Session.set("this_game_player_data", undefined);
        },

        assert_player_move : function(game_data, targetid, target_xo_element) {
            // we are making the assumption that the target
            // doesn't have an element in it. This is being
            // asserted upstream in the rendering phase. 
            // Later we will have to refactor to enforce move
            // validity in this function so we can "prevent"
            // rogue clients (or more realistically, shitty ui
            // rendering code).

            var targetid_int = parseInt(targetid.replace("C", "")),
                parent_index = Math.floor(targetid_int / 10),
                child_index = targetid_int % 10,
                target_xo_element = target_xo_element.toUpperCase();

            game_data.parent_board[parent_index].child_board[child_index] = target_xo_element;
            $("#"+targetid).removeClass("preview-"+target_xo_element).removeClass("valid-move");


            var game_win = TA.functions._check_win(game_data);
            if(game_win) {
                alert(game_win + "Won the game");
            }
            console.log(game_data);
            Games.update({_id : Session.get("game_id")}, game_data);
        },

        _check_win : function(game_data) {
            
            // brute force check child boards
            for(var i = 0; i < 9; i++) {
                var child_board = game_data.parent_board[i].child_board;
                if(child_board.won == "X" || child_board.won == "O") {
                    continue;
                }

                var v0 = TA.functions._compare_three_xo_elements(child_board[0], child_board[3], child_board[6]),
                    v1 = TA.functions._compare_three_xo_elements(child_board[1], child_board[4], child_board[7]),
                    v2 = TA.functions._compare_three_xo_elements(child_board[2], child_board[5], child_board[8]),
                    h0 = TA.functions._compare_three_xo_elements(child_board[0], child_board[1], child_board[2]),
                    h1 = TA.functions._compare_three_xo_elements(child_board[3], child_board[4], child_board[5]),
                    h2 = TA.functions._compare_three_xo_elements(child_board[6], child_board[7], child_board[8]),
                    d0 = TA.functions._compare_three_xo_elements(child_board[0], child_board[4], child_board[8]),
                    d1 = TA.functions._compare_three_xo_elements(child_board[2], child_board[4], child_board[6]),
                    board_win = v0+v1+v2+h0+h1+h2+d0+d1;

                if(board_win == 1) {
                    var winning_xo_element = "";
                    if(v1 || h1 || d0 || d1) {
                        winning_xo_element = child_board[4];
                    }else if(v0 || h0) {
                        winning_xo_element = child_board[0];
                    }else if(v2 || h2) {
                        winning_xo_element = child_board[8];
                    }else {
                        console.log("unknown board_win == 1");
                        continue;
                    }

                    game_data.parent_board[i].won = winning_xo_element.toUpperCase();
                }else if(board_win > 1) {
                    console.log("unknown board_win > 1");
                }
            }

            // brute force check parent board
            var v0 = TA.functions._compare_three_xo_elements(game_data.parent_board[0].won, game_data.parent_board[3].won, game_data.parent_board[6].won),
                v1 = TA.functions._compare_three_xo_elements(game_data.parent_board[1].won, game_data.parent_board[4].won, game_data.parent_board[7].won),
                v2 = TA.functions._compare_three_xo_elements(game_data.parent_board[2].won, game_data.parent_board[5].won, game_data.parent_board[8].won),
                h0 = TA.functions._compare_three_xo_elements(game_data.parent_board[0].won, game_data.parent_board[1].won, game_data.parent_board[2].won),
                h1 = TA.functions._compare_three_xo_elements(game_data.parent_board[3].won, game_data.parent_board[4].won, game_data.parent_board[5].won),
                h2 = TA.functions._compare_three_xo_elements(game_data.parent_board[6].won, game_data.parent_board[7].won, game_data.parent_board[8].won),
                d0 = TA.functions._compare_three_xo_elements(game_data.parent_board[0].won, game_data.parent_board[4].won, game_data.parent_board[8].won),
                d1 = TA.functions._compare_three_xo_elements(game_data.parent_board[2].won, game_data.parent_board[4].won, game_data.parent_board[6].won),
                board_win = v0+v1+v2+h0+h1+h2+d0+d1;

            var winning_xo_element = "";
            if(board_win == 1) {
                if(v1 || h1 || d0 || d1) {
                    winning_xo_element = game_data.parent_board[4].won;
                }else if(v0 || h0) {
                    winning_xo_element = game_data.parent_board[0].won;
                }else if(v2 || h2) {
                    winning_xo_element = game_data.parent_board[8].won;
                }else {
                    console.log("unknown parent board_win == 1");
                    return null;
                }
            }else if(board_win > 1) {
                console.log("unknown parent board_win > 1");
                return null;
            }

            return winning_xo_element.toUpperCase();
        },

        _compare_three_xo_elements : function(e1, e2, e3) {
            var equalsX = e1 == "X" && e2 == "X" && e3 == "X",
                equalsO = e1 == "O" && e2 == "O" && e3 == "O";
            return equalsX || equalsO;
        }
    };
    
    window["TA"] = TA;

 })();