
/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Client controller code.
 */
Template.parent_game_grid.game_data = function() {
    return Games.findOne({_id : "e7QFtyHE7ZrSX3bTX"});
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
            return "preview-"+ Session.get("this_player");
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
    'click .child-game-element' : function(e) {
        console.log(e.target.id);
    }
});