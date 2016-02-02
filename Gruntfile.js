module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* CSS */

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },

        postcss: {
            options: {
                map: {
                  inline: false, // save all sourcemaps as separate files...
                  annotation: 'css/main.postcss.map' // ...to the specified directory
                },

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        concat_css: {
            options: {},
            all: {
              src: ["/css/*.css"],
              dest: "css/main.css"
            },
        },

        cssmin: {
          target: {
            files: {
              'css/main.min.css': ['css/main.css']
            }
          }

        },

        /* JS */

        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true
            }
        },

        concat: {
          dist: {
            src: ['js/*.js'],
            dest: 'js/main.js',
          }
        },

        uglify: {
          dist: {
            files: {
              'js/main.min.js': ['js/main.js']
            }
          }
        },

        /* OTHER STUFF */

        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
            },

            postcss: {
                files: ['css/*.css'],
                tasks: ['postcss'],
            },

            concat_css: {
                files: ['css/*.css'],
                tasks: ['concat-css'],
            },

            cssmin: {
                files: ['css/main.css'],
                tasks: ['cssmin'],
            },

            jshint: {
                files: ['js/*.js'],
                tasks: ['jshint'],
            },

            concat: {
                files: ['js/*.js'],
                tasks: ['concat'],
            },

            uglify: {
                files: ['js/main.js'],
                tasks: ['uglify'],
            },

            src: {
                files: ['*.html', '*.css'],
                options: {
                    livereload: true
                }
            },
        },

        express:{
            all:{
                options:{
                    port:3000,
                    hostname:'localhost',
                    bases:['.'],
                    livereload:true 
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-concat-css');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express');

grunt.registerTask('default', ['sass', 'concat_css', 'cssmin', 'postcss', 'jshint', 'concat', 'uglify']);
grunt.registerTask('server', ['express', 'watch']);

};