Template.parent_game_grid.game_data = function() {

    var return_object = {
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
        ]
    };

    return return_object;

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