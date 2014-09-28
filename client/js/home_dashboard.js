Template.home_dashboard.events({
    'click #landing-dashboard-logout' : function(e) {
        TA.functions.logout();
    },

    'click .landing-dashboard-create-game' : function(e) {
    	TA.functions.create_new_game_and_push_history();
    }
});