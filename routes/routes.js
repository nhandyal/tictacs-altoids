/**
 * Iron router
 * Project Home: https://github.com/EventedMind/iron-router
 * Tutorial: http://robertdickert.com/blog/2014/05/08/iron-router-first-steps/
 */

Router.configure({
    waitOn : function() {
        return function() {
            return ! Meteor.loggingIn();
        }
    }
});

Router.map(function() {
    
    this.route('home', {
        path : '/',
        template : 'home',
        onBeforeAction : function() {
            if(Meteor.user()) {
                return Router.go("/"+TA.functions.get_current_username());
            }
        }
    });

    this.route('login', {
        path : '/login',
        template : 'home',
        onBeforeAction : function() {
            if(Meteor.user()) {
                return Router.go("/");  // let the home route handle the redirect to /username
            }

            Session.set("landing_login_register_intent", "login");
        }
    });

    this.route('register', {
        path : 'register',
        template : 'home',
        onBeforeAction : function() {
            if(Meteor.user()) {
                return Router.go("/");  // let the home route handle the redirect to /username
            }

            Session.set("landing_login_register_intent", "register");
        }
    });
    
    this.route('userHome', {
        path : '/:_username',
        template : 'home',
        onBeforeAction : function() {
            if(!Meteor.user()) {
                return Router.go("/");
            }
        }
    });

    this.route('game', {
        path: '/game/:_game_id',
        action : function() {
            Session.set("game_id", this.params._game_id);
            this.render();
        }
    });
    
});