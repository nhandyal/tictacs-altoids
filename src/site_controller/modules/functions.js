TA.functions = {
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
        Router.go("/");
    },

    assert_player_move : function(game_data, targetid, target_xo_element) {
        target_xo_element = target_xo_element.toUpperCase();

        var targetid_int = parseInt(targetid.replace("C", ""), 10),
            target_parent_index = Math.floor(targetid_int / 10),
            target_child_index = targetid_int % 10,
            next_player = target_xo_element == 'X' ? 'O' : 'X',
            fated_parent_index = target_child_index;

        game_data.parent_board[target_parent_index].child_board[target_child_index] = target_xo_element;
        game_data.parent_board[target_parent_index].available_spaces = game_data.parent_board[target_parent_index].available_spaces - 1;
        game_data.game_moves.push(targetid+target_xo_element);
        game_data.current_player = next_player;
        game_data.active_parent_board = game_data.parent_board[fated_parent_index].available_spaces === 0 ? -1 : fated_parent_index;

        var game_win = _check_win(game_data, target_parent_index, target_child_index, target_xo_element);
        if(game_win) {
            game_data.state = "finished";
            alert(game_win + "Won the game");
        }
        console.log(game_data);
        Games.update({_id : Session.get("game_id")}, game_data);
    }
};
