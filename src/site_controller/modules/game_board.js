function game_board() {
    return {
        parent_board : [
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 0
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 1
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 2
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 3
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 4
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 5
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 6
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 7
            },
            {
                child_board : ['-','-','-','-','-','-','-','-','-'],
                won : '-',
                available_spaces : 9,
                index : 8
            }
        ],
        parent_board_array : ['-','-','-','-','-','-','-','-','-'],
        won : '-',

        game_moves : [],
        current_player : "X",
        active_parent_board : -1,
        
        player_data : {
            X : {
                id : "",
                email : ""
            },
            O : {
                id : "",
                email : ""
            }
        },

        /*
         * Possible game states are
         *      new         -- really just a placeholder
         *      waiting     -- while one oponent is waiting for another to connect
         *      active      -- while the game is baing played
         *      finished    -- after the game has been finished
         */
        state : "new"
    };
}
