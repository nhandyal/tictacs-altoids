var mouse_position = null,
    user_inactive_count = 0,
    user_inactive_interval_handle = null,
    user_inactive_notification_seen = true,

    _check_win = function(game_data, p_index, c_index, xo) {
        /**
         * Checks the game state for a win. Updates the game_data var
         * in place to reflect any wins. Returns true iff there is a
         * win on the parent board.
         */
        var n = 3;
        xo = xo.toUpperCase();

        // check the child board for a win
        var child_x = c_index % n;
            child_y = Math.floor(c_index / n);

        if(game_data.parent_board[p_index].won != "-") {
            return false;
        }
        var child_win = _check_win_on_array(child_x, child_y, n, game_data.parent_board[p_index].child_board, xo);

        if(!child_win) {
            return false;
        }
        game_data.parent_board[p_index].won = xo;
        game_data.parent_board_array[p_index] = xo;

        // check the parent board for a win
        var parent_x = p_index % n,
            parent_y = Math.floor(p_index / n);

        var parent_win = _check_win_on_array(parent_x, parent_y, n, game_data.parent_board_array, xo);

        if(!parent_win) {
            return false;
        }
        game_data.won = xo;

        return true;
    },

    _check_win_on_array = function(x, y, n, backing_array, xo) {
        // convert an (x,y) coord to array index
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
    },

    _update_user_inactive_state = function() {

    };
