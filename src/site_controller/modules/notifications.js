TA.notifications = {
    
    use_sounds : false,

    enable_sounds : function() {
        this.use_sounds = true;
    },

    disable_sounds : function() {
        this.use_sounds = false;
    },

    notify_tada : function() {
        if(this.use_sounds) {
            $("#notif-tada")[0].play();
        }
        mute_tada = false;
    },

    notify_wow : function() {
        if(this.use_sounds) {
            $("#notif-wow")[0].play();
        }
    }
};
