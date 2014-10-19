function get_stripped_email(player_data, player_key) {
    return player_data[player_key].email = player_data[player_key].email.substring(0, player_data[player_key].email.indexOf('@')).toLowerCase();
}

Template.game_stats_template.game_stats = function() {
    var game_data = TA.functions.get_game_by_session(),
        player_data = game_data.player_data,
        game_state = game_data.state.toUpperCase(),
        return_obbject = {};

    if(!player_data) {
        console.log("Something went wrong");
        // evnetually put in a page that says something
        // went wrong and route to there
        return null;
    }

    // the get stripped email function modifies the player_data object
    player_data.X.email = get_stripped_email(player_data, "X");
    player_data.O.email = get_stripped_email(player_data, "O");

    switch(game_state) {
        case "WAITING":
            return_obbject["game_state"] = "Waiting for opponent";
            break;
        case "ACTIVE":
            var current_player = game_data.current_player.toUpperCase(),
                player_name = current_player == "X" ? player_data.X.email : player_data.O.email;

            return_obbject["game_state"] = player_name + "'s turn";
            break;
        case "FINISHED":
            return_obbject["game_state"] = "winner";
            break;
    }

    return_obbject["player_data"] = player_data;

    return return_obbject;
}