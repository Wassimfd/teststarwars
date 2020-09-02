module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        
        pkg : grunt.file.readJSON("package.json"),

        browserify: {
            dist: {
                files: {
                    './dist/js/index.js': [
                        './src/js/**/*.js'
                    ]
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        sass: {
            dist: {
              options: {
                style: 'compressed',
                sourcemap: "auto"
              },
              files: {
                './dist/style/style.css': [
                    './src/style/style.scss'
                ]
              }
            }
          },

        eslint : {
            options : {
                configFile : "eslintrc.json",
                format     : "stylish",
                fix        : true
            },
            files : {
                src : [
                    "Gruntfile.js",
                    "./src/**/*/*.js"
                ]
            }
        },

        sync : {
            syncHtml: {
                files: [{
                    cwd  : "./src",
                    src  : ["*.html"],
                    dest : "./dist"
                }]
            },
            syncAssets: {
                files: [{
                    cwd  : "./src/assets",
                    src  : ["**"],
                    dest : "./dist/assets"
                }]
            }
        },

        uglify : {
            files : {
                src : [
                    "./dist/js/index.js"
                ],
                dest : "./dist/js/index.min.js"
            }
        },

        watch : {
            sass : {
                files   : ["./src/**/*/*.scss"],
                tasks   : ["sass"],
            },
            scripts : {
                files   : ["./src/**/*/*.js"],
                tasks   : ["sync", "browserify", "uglify"],
            },
            htmlFiles : {
                files   : ["./src/*.html"],
                tasks   : ["sync"],
            },
        },
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Tasks
    grunt.registerTask("default", ["sass", "sync", "browserify:dist", "uglify"]);
    grunt.registerTask("babel", ["babel"]);
};
