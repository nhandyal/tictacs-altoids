/**
 * Description : Global functions and data for the tictacs and altoids app
 */

 (function(){

    var TA = {};

    var _check_win = function(game_data, p_index, c_index, xo) {
            /**
             * Checks the game state for a win. Updates the game_data var
             * in place to reflect any wins. Returns true iff there is a
             * win on the parent board.
             */
            var n = 3;
            xo = xo.toUpperCase();

            // check the child board for a win
            var child_board = game_data.parent_board[p_index].child_board,
                child_x = c_index % n;
                child_y = Math.floor(c_index / n);
                child_win = _check_win_on_array(child_x, child_y, n, child_board, xo);

            if(!child_win) {
                return false;
            }
            game_data.parent_board[p_index].won = xo;

            // check the parent board for a win
            // we need to generate a backing array from the data store
            var parent_board = [],
                parent_x = p_index % n,
                parent_y = Math.floor(p_index / n);

            for(var i = 0; i < 9; i++) {
                parent_board.push(game_data.parent_board[i].won);
            }

            var parent_win = _check_win_on_array(parent_x, parent_y, n, parent_board, xo);

            if(!parent_win) {
                return false;
            }
            game_data.won = xo;

            return true;
        },

        _check_win_on_array = function(x, y, n, backing_array, xo) {
            // the algorithm we are using to determine a win
            // assumes data is addressable in a (x,y) format.
            // Our data store records the data in an array.
            // The following returns the element stored in the
            // data store given an XY coord.
            var getViaXY = function(x, y) {
                    var i = x + (y * n);
                    return backing_array[i].toUpperCase();
                };

                coll = row = diag = rdiag = 0;

            xo = xo.toUpperCase();
            for(var i = 0; i < n; i ++) {
                coll += (getViaXY(x, i) == xo) ? 1 : 0;
                row += (getViaXY(i, y) == xo) ? 1 : 0;
                diag += (getViaXY(i, i) == xo) ? 1 : 0;
                rdiag += (getViaXY(n-(i+1), i) == xo) ? 1 : 0;
            }
            return (coll == n || row == n || diag == n || rdiag == n) ? xo : null;
        };

    
    TA["data"] = {
        game_data : function() {
            var game_board = {
                parent_board : [
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 0
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 1
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 2
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 3
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 4
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 5
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 6
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 7
                    },
                    {
                        child_board : ['-','-','-','-','-','-','-','-','-'],
                        won : '-',
                        available_spaces : 9,
                        index : 8
                    }
                ],
                won : '-',

                game_moves : [],
                current_player : "X",
                active_parent_board : -1,
                
                player_data : {
                    X : {
                        id : "",
                        email : ""
                    },
                    O : {
                        id : "",
                        email : ""
                    }
                },

                /*
                 * Possible game states are
                 *      new         -- really just a placeholder
                 *      waiting     -- while one oponent is waiting for another to connect
                 *      active      -- while the game is baing played
                 *      finished    -- after the game has been finished
                 */
                state : "new"
            };

            return game_board;
        }
    };

    TA["functions"] = {
        create_new_game_and_push_history : function() {            
            var user = Meteor.user(),
                new_game_data = new TA.data.game_data(),
                game_id = "";

            // the player to create the game is X, the next player to join is O
            new_game_data.player_data.X.id = user._id;
            new_game_data.player_data.X.email = user.emails[0].address;
            new_game_data.state = "waiting";
            
            game_id = Games.insert(new_game_data);
            
            Router.go("/game/" + game_id);
        },

        get_current_username : function() {
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
                return {};
            }

            return game_data;
        },

        logout : function() {
            Meteor.logout();
            Session.set("landing_login_register_intent", undefined);
            Session.set("username", undefined);
            Router.go("/");
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
                target_parent_index = Math.floor(targetid_int / 10),
                target_child_index = targetid_int % 10,
                target_xo_element = target_xo_element.toUpperCase(),
                next_player = target_xo_element == 'X' ? 'O' : 'X',
                fated_parent_index = target_child_index;

            game_data.parent_board[target_parent_index].child_board[target_child_index] = target_xo_element;
            game_data.parent_board[target_parent_index].available_spaces = game_data.parent_board[target_parent_index].available_spaces - 1;
            game_data.game_moves.push(targetid+target_xo_element);
            game_data.current_player = next_player;
            game_data.active_parent_board = game_data.parent_board[fated_parent_index].available_spaces == 0 ? -1 : fated_parent_index;

            var game_win = _check_win(game_data, target_parent_index, target_child_index, target_xo_element);
            if(game_win) {
                game_data.state = "finished";
                alert(game_win + "Won the game");
            }
            console.log(game_data);
            Games.update({_id : Session.get("game_id")}, game_data);
        },

        
    };
    
    window["TA"] = TA;

 })();