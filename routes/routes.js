/**
 * Iron router
 * Project Home: https://github.com/EventedMind/iron-router
 * Tutorial: http://robertdickert.com/blog/2014/05/08/iron-router-first-steps/
 */

Router.map(function() {
    
    this.route('home', {path: '/',});

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
    
    this.route('about');
});