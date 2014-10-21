module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var js_no_modify_banner = grunt.file.read('src/no_modify_banner.txt');

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        dist_dest : 'app/client/js/site_controller/_TA.js',
        
        concat : {
            options : {
                seperator : ';',
            },

            main : {
                src : [
                    "src/site_controller/header.js",
                    "src/site_controller/core.js",
                    "src/site_controller/modules/**/*.js",
                    "src/site_controller/footer.js",
                ],
                
                dest    : '<%= dist_dest %>'
            }
        },

        copy : {
            main : {
                src : 'src/main.js',
                dest : 'app/client/js/main.js',
                options : {
                    process : function(content, srcPath) {
                        return js_no_modify_banner + content;
                    }
                }
            },

            template_controllers : {
                expand : true,
                cwd : 'src/template_controllers',
                src : ['**/*.js'],
                dest : 'app/client/js/template_controllers',
                options : {
                    process : function(content, srcPath) {
                        return js_no_modify_banner + content;
                    }
                }
            }
        },
        
        jshint : {
            options : {
                globals : {
                    console : true
                }
            },
            
            dev: [
                    "src/site_controller/globals.js",
                    "src/site_controller/core.js",
                    "src/site_controller/modules/**/*.js",
                    "src/template_controllers/**/*.js"
                ],

            dist : ['<%= dist_dest %>']
        },
        
        jsbeautifier : {
            files : ['<%= dist_dest %>']
        },

        watch : {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    });

    // tasks
    grunt.registerTask('default', ['jshint:dev', 'concat', 'jsbeautifier', 'copy']);
    grunt.registerTask('release', ['default', 'jshint:dist']);
    grunt.registerTask('lint', ['jshint:dev']);

};