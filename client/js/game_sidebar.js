//Template.game_sidebar.
Template.game_sidebar.game_stats = function() {
    var return_object = {},
        this_game_player_data = Session.get("this_game_player_data");

    return_object["ready"] = this_game_player_data;
    return_object["waiting_for_opponent"] = this_game_player_data[1];

    for(var key in this_game_player_data) {
        var player = this_game_player_data[key];
        if(player.xo_element == "X") {
            return_object["player_X"] = player.email.substring(0, player.email.indexOf('@'));
        }else {
            return_object["player_O"] = player.email.substring(0, player.email.indexOf('@'));
        }
    }

    return return_object;
}


Template.game_sidebar.helpers({
    display_game_stats : function() {
        var this_game_player_data = Session.get("this_game_player_data");
        console.log(this_game_player_data);
        
        if(!this_game_player_data) {
            return null;
        }

        if(this_game_player_data[1]) {
            return "waiting for opponent";
        }else {
            var player_x = "",
                player_o = "";

            for(var key in this_game_player_data) {
                var player = this_game_player_data[key];
                if(player.xo_element == "X") {
                    player_x = player.email;
                    player_x = player_x.substring(0, player_x.indexOf('@'));
                }else {
                    player_o = player.email;
                    player_o = player_o.substring(0, player_o.indexOf('@'));
                }
            }

            return player_x +" : X<br/>" + player_o + " : O<br/>";
        }

        return false;
    }
});