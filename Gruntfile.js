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

        svg_sprite: {
            options: {
                // Task-specific options go here. 
            },
            target: {
                expand: true,
                cwd: 'img/svg',
                src: ['**/*.svg'],
                dest: 'img',
                options: {
                    mode: {
                        css: {
                            render: {
                                scss: true
                            }
                        },
                        symbol: true
                    }
                }
            },
        },


        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
            },

            concat_css: {
                files: ['css/*.css'],
                tasks: ['concat-css'],
            },

            cssmin: {
                files: ['css/main.css'],
                tasks: ['cssmin'],
            },

            postcss: {
                files: ['css/*.css'],
                tasks: ['postcss'],
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

            svg_sprite: {
                files: ['img/svg/*.svg'],
                tasks: ['svg_sprite'],
            }

            livereload: {
                files: ['*.html', '*.css', '*.js'],
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
                    livereload: true 
                }
            }
    });
        }

grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-concat-css');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express');
grunt.loadNpmTasks('grunt-svg-sprite');

grunt.registerTask('default', ['sass', 'concat_css', 'cssmin', 'postcss', 'jshint', 'concat', 'uglify']);
grunt.registerTask('server', ['express', 'watch']);

};