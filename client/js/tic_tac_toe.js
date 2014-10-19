
/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Client controller code.
 */
var game_data = null,
    spectating = true,
    check_and_assign_opponent = function(user) {
        if(game_data.player_data.O.id == "" && game_data.player_data.X.id != user._id) {
            game_data.player_data.O.id = user._id;
            game_data.player_data.O.email = user.emails[0].address;
            game_data.state = "active";

            Games.update({_id : game_data._id}, game_data);
        }
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
            Session.set("this_player_xo_element", "X");
        }else if(game_data.player_data.O.id == user._id) {
            Session.set("this_player_xo_element", "O");
        }
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
    preview_xo_element : function(element_index) {

        // prevent playing if game is not in an active state
        if (game_data.state.toUpperCase() != "ACTIVE" || spectating) {
            return "";
        }

        var parent_index = this.index,
            target_id = parent_index + '' + element_index + 'C',
            xo_element = this.child_board[element_index];

        if(xo_element == "-") {
            return "valid-xo-move preview-"+ Session.get("this_player_xo_element");
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
        var game_data = TA.functions.get_game_by_session(),
            xo_element = Session.get("this_player_xo_element");
        
        TA.functions.assert_player_move(game_data, e.target.id, xo_element);
    }
});