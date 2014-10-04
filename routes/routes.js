/**
 * Iron router
 * Project Home: https://github.com/EventedMind/iron-router
 * Tutorial: http://robertdickert.com/blog/2014/05/08/iron-router-first-steps/
 */

Router.configure({
    onBeforeAction : function() {
        TA.functions.reset_game_session_state();
    }
});

Router.map(function() {
    
    this.route('home', {
        path : '/'
    });

    this.route('login', {
        template : 'home',
        action : function() {
            Session.set("landing_login_register_intent", "login");
            this.render();
        }
    });

    this.route('register', {
        template : 'home',
        action : function() {
            Session.set("landing_login_register_intent", "register");
            this.render();
        }
    });
    
    this.route('userHome', {
        path : '/:_username',
        template : 'home'
    });

    this.route('game', {
        path: '/game/:_game_id',
        action : function() {
            Session.set("game_id", this.params._game_id);
            this.render();
        }
    });
    
});