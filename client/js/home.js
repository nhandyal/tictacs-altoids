Template.home.helpers({
    check_login_redirect : function() {
        var user_email = TA.functions.get_current_user_email();
        var path = window.location.pathname.replace("/","").trim().toLowerCase();
        
        if(user_email) {
            user_email = user_email.toLowerCase();
        }

        if(path == "") {
            if(user_email) {
                Router.go("/"+user_email);
                return;
            }
        }

        if(path == 'login' || path == 'register') {
            if(user_email) {
                Router.go("/"+user_email);
                return;
            }
        }

        if(user_email) {
            if(path != user_email) {
                TA.functions.logout();
                return;
            }
        }

        return;
    }
});