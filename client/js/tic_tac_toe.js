
/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Client controller code.
 */
Template.parent_game_grid.game_data = function() {
    var user = TA.functions.ensure_user_login(),
        username = user.username,
        this_player_xo_element = "";

    var game_data = TA.functions.get_game_by_session();

    this_player_xo_element = game_data.player_data[username].xo_element;
    Session.set("this_player_xo_element", this_player_xo_element);

    return game_data;
};

Template.parent_game_grid.helpers({
    render_xo_element : function(element_index) {
        var index = element_index,
            target_id = '0' + element_index + 'P',
            xo_element = this.parent_board[index].won;

        xo_element = xo_element.toUpperCase();
        if(xo_element == "X") {
            TA.data.xo_targets_to_show.push(target_id);
            setTimeout(TA.functions.process_xo_elements, 0);
            return "XP";
        }else if(xo_element == "O") {
            TA.data.xo_targets_to_show.push(target_id);
            setTimeout(TA.functions.process_xo_elements, 0);
            return "OP";
        }
        
        return "";
    }
});

Template.child_game_grid.helpers({
    preview_xo_element : function(element_index) {
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
            TA.data.xo_targets_to_show.push(target_id);
            setTimeout(TA.functions.process_xo_elements, 0);
            return "XC";
        }else if(xo_element == "O") {
            TA.data.xo_targets_to_show.push(target_id);
            setTimeout(TA.functions.process_xo_elements, 0);
            return "OC";
        }
        
        return "";
    }
});

Template.child_game_grid.events({
    'click .valid-xo-move' : function(e) {
        var game_data = TA.functions.get_game_by_session(),
            xo_element = Session.get("this_player_xo_element");
        
        TA.functions.assert_player_move(game_data, e.target.id, xo_element);
    }
});