/**
 * Iron router
 * Project Home: https://github.com/EventedMind/iron-router
 * Tutorial: http://robertdickert.com/blog/2014/05/08/iron-router-first-steps/
 */

Router.map(function() {
    
    this.route('home', {
        path : '/',
        onBeforeAction : function() {
            if(Meteor.user()) {
                var user = TA.functions.getCurrentUser().toLowerCase();
                this.redirect('/'+user);
            }
        }
    });

    this.route('login', {
        template : 'home',
        onBeforeAction : function() {
            if(Meteor.user()) {
                var user = TA.functions.getCurrentUser().toLowerCase();
                this.redirect('/'+user);
            }
        },
        action : function() {
            Session.set("landing_login_register_intent", "login");
            this.render();
        }
    });

    this.route('register', {
        template : 'home',
        onBeforeAction : function() {
            if(Meteor.user()) {
                var user = TA.functions.getCurrentUser().toLowerCase();
                this.redirect('/'+user);
            }
        },
        action : function() {
            Session.set("landing_login_register_intent", "register");
            this.render();
        }
    });
    
    this.route('userHome', {
        path : '/:_username',
        template : 'home'
    });

    this.route('game', {path: 'game/:_game_id',});
});