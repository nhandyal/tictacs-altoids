
/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Client controller code.
 */
var game_data = null,
    spectating = true,
    this_player_xo_element = "",
    prior_parent_board_array = null,

    check_and_assign_opponent = function(user) {
        if(game_data.player_data.O.id == "" && game_data.player_data.X.id != user._id) {
            game_data.player_data.O.id = user._id;
            game_data.player_data.O.email = user.emails[0].address;
            game_data.state = "active";

            Games.update({_id : game_data._id}, game_data);
        }
    },

    this_player_turn = function() {
        if(game_data.current_player.toUpperCase() == this_player_xo_element && game_data.state.toUpperCase() == "ACTIVE") {
            return true;
        }
    },

    alert_win_or_turn = function() {
        if(this_player_turn()) {
            for(var i = 0; i < 9; i++) {
                if(prior_parent_board_array[i] != game_data.parent_board_array[i]) {
                    prior_parent_board_array = game_data.parent_board_array;
                    return TA.functions.notify_wow();
                }
            }
            prior_parent_board_array = game_data.parent_board_array;

            return TA.functions.notify_tada();
        }
    }

Template.game.rendered = function() {
    TA.functions.enable_notif_sounds();
}

Template.parent_game_grid.game_data = function() {
    var user = Meteor.user();
    
    game_data = TA.functions.get_game_by_session();
    spectating = true;

    if(user) {
        spectating = false;
        
        // check if this game has an oponent
        // if it doesn't set this player to be O
        check_and_assign_opponent(user);

        if(game_data.player_data.X.id == user._id) {
            this_player_xo_element =  "X"
        }else if(game_data.player_data.O.id == user._id) {
            this_player_xo_element =  "O"
        }

        if(!prior_parent_board_array) {
            prior_parent_board_array = game_data.parent_board_array;
        }

        alert_win_or_turn();
    }
    return game_data;
};

Template.parent_game_grid.helpers({
    render_xo_element : function(element_index) {
        var index = element_index,
            target_id = '0' + element_index + 'P',
            xo_element = this.parent_board[index].won;

        xo_element = xo_element.toUpperCase();
        if(xo_element == "X") {
            return "XP full-opacity";
        }else if(xo_element == "O") {
            return "OP full-opacity";
        } 
    }
});

Template.child_game_grid.helpers({
    active : function(element_index) {
        var active_parent_board = game_data.active_parent_board;

        if(active_parent_board == element_index) {
            return "active";
        }else {
            return "";
        }
    },

    preview_xo_element : function(parent_index, element_index) {

        // prevent playing in invalid situations
        if (spectating || !this_player_turn()) {
            return "";
        }

        var parent_index = this.index,
            target_id = parent_index + '' + element_index + 'C',
            xo_element = this.child_board[element_index],
            active_parent_board = game_data.active_parent_board;

        // prevent playing if parent board isn't active
        if(active_parent_board != -1 && active_parent_board != parent_index) {
            return "";
        }

        if(xo_element == "-") {
            return "valid-xo-move preview-" + this_player_xo_element;
        }else {
            return "";
        }
    },

    render_xo_element : function(element_index) {
        var parent_index = this.index,
            target_id = parent_index + '' + element_index + 'C',
            xo_element = this.child_board[element_index];

        xo_element = xo_element.toUpperCase();
        if(xo_element == "X") {
            return "XC full-opacity";
        }else if(xo_element == "O") {
            return "OC full-opacity";
        }
    }
});

Template.child_game_grid.events({
    'click .valid-xo-move' : function(e) {
        TA.functions.assert_player_move(game_data, e.target.id, this_player_xo_element);
    }
});