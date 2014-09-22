
/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Client controller code.
 */

/**
 * {...} index bounds for an array
 *
 * games : {
 *      _id : @Type:String
 *      outter_board : {
 *          0 : {
 *               inner_board : [...] @Type:Char {0-8},
 *               won : <-,X,O> @Type:Char
 *           }
 *           .
 *           .
 *           .
 *           8 : {...}
 *       },
 *       game_moves : ["05X", "53O", ...] @Type:String {0-N},
 *       current_turn : <X/O> @Type:Char,
 *       available_inner_spaces : [...] @Type:Int {0-8},
 *       available_xo_elements : ['X', 'O']
 * }
 */

var game_data  = function() {
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
            available_xo_elements : ['X', 'O']
        };

        return game_board;
    },
    game_id = "";

/*
window.addEventListener('popstate', function(event) {
    //popstate fired
});
*/

// path: /<game_id>
var path = window.location.pathname;

if(path == "/") {
    // create new db object and push to history
    var new_game_data = new game_data(),
        game_id = Games.insert(new_game_data);

    window.history.pushState({"game_id" : game_id}, "tictacs & Altoids game : " + game_id, "/" + game_id);
}else {
    game_id = path.replace("/", "");
}

Meteor.startup(function() {
    // is called after the template are rendered
});

Template.parent_game_grid.game_data = function() {
    return Games.findOne({_id : game_id});
};

var xo_targets_to_show = [];

function process_xo_elements() {
    for(var i = 0; i < xo_targets_to_show.length; i++) {
        var xo_element_id = xo_targets_to_show.splice(0, 1);
        $("#"+xo_element_id+" > .XO-container").addClass("full-opacity");
    }
}

Template.parent_game_grid.helpers({
    render_xo_element : function(element_index) {

        var index = element_index,
            target_id = '0' + element_index + 'P',
            xo_element = this.parent_board[index].won;

        xo_element = xo_element.toUpperCase();
        if(xo_element == "X") {
            xo_targets_to_show.push(target_id);
            setTimeout(process_xo_elements, 0);
            return "XP";
        }else if(xo_element == "O") {
            xo_targets_to_show.push(target_id);
            setTimeout(process_xo_elements, 0);
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
            xo_targets_to_show.push(target_id);
            setTimeout(process_xo_elements, 0);
            return "XC";
        }else if(xo_element == "O") {
            xo_targets_to_show.push(target_id);
            setTimeout(process_xo_elements, 0);
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