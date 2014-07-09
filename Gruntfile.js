'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * Project info
         */
        project: {
            css_src: [
                '_src/css'
            ],
            css_res: [
                'assets/css'
            ],
            img_src: [
                '_src/img'
            ],
            img_res: [
                'assets/img'
            ],
            js_src: [
                '_src/js/*.js'
            ],
            js_res: [
                'assets/js/*.js'
            ]
        },

        /**
         * Project banner
         * Inherits text from package.json
         */
        tag: {
            banner: '/*!\n' +
                ' * Name: <%= pkg.name %>\n' +
                ' * Project: <%= pkg.description %>\n' +
                ' * Author: <%= pkg.author %>\n' +
                ' * Version: <%= pkg.version %>\n' +
                ' */\n'
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                pushTo: 'origin'
            }
        },

        /**
         * https://npmjs.org/package/grunt-contrib-sass
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    // debugInfo: true
                    // sourcemap: true
                },
                files: {
                    '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
                }
            },
            dist: {
                options: {
                    style: 'expanded',
                    // banner: '<%= tag.banner %>'
                },
                files: {
                    '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
                }
            }
        },

        /**
         * https://npmjs.org/package/grunt-autoprefixer
         */
        autoprefixer: {
            dist: {
                options: {},
                src: '<%= project.css_src %>/style.unprefixed.css',
                dest: '<%= project.css_res %>/style.css'
            },
        },

        svgstore: {
            options: {},
            default: {
                files: {
                    'assets/img/svg/svg-lib.svg': ['_src/img/svg-lib/*.svg'],
                },
            },
        },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }]
            },
            dist: {
                files: [{ // Dictionary of files
                    expand: true, // Enable dynamic expansion.
                    cwd: 'assets/img/svg', // Src matches are relative to this path.
                    src: ['svg-lib.svg', 'cat.svg'], // Actual pattern(s) to match.  src: ['**/*.svg'],
                    dest: 'assets/img/svg', // Destination path prefix.
                    ext: '.svg' // Dest filepaths will have this extension.
                    // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '_src/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img'
                }]
            }
        },

        sprite: {
            all: {
                src: '_src/img/browsers-64/*.png',
                destImg: 'assets/img/parts/sprite-browsers-64.png',
                destCSS: '_src/css/browsers-sprite.css'
            }
        },

        /**
         * https://npmjs.org/package/grunt-contrib-watch
         * Now with livereload
         */
        watch: {
            css: {
                files: '<%= project.css_src %>{,*/}*.{scss,sass}',
                tasks: ['sass:dev', 'autoprefixer'],
                options: {
                    livereload: 35731,
                },
            }
        },

        /**
         * https://github.com/alanshaw/grunt-include-replace
         * Include files for build version
         */
        includereplace: {
            dev: {
                options: {
                    // Task-specific options go here.
                },
                // Files to perform replacements and includes with
                src: 'index-src.html',
                // Destination directory to copy files to
                dest: 'index.html'
            },
            build: {
                options: {
                    // Task-specific options go here.
                },
                // Files to perform replacements and includes with
                src: 'index.html',
                // Destination directory to copy files to
                dest: 'build/index.html'
            }
        },

        copy: {
            main: {
                files: [

                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['assets/**'],
                        dest: 'build/'
                    }, {
                        expand: true,
                        src: ['node_modules/shower-core/**'],
                        dest: 'build/'
                    }, {
                        expand: true,
                        src: ['node_modules/shower-bright/**'],
                        dest: 'build/'
                    },
                    // {expand: true, src: ['index.html'], dest: 'build/'}
                ]
            }
        },

        connect: {
            server: {
                options: {
                    // base: './',
                    port: 9001,
                    open: {
                        target: 'http://localhost:9001', // target url to open
                        // appName: 'Chrome'
                    }
                }
            }
        }
    });

    /**
     * Default task
     * Run `grunt` on the command line
     */
    // grunt.registerTask('default', ['bump']);

    grunt.registerTask('default', [
        'connect:server:open',
        'watch'
    ]);

    grunt.registerTask('replace', [
        'includereplace:dev'
    ]);

    grunt.registerTask('svg', [
        'svgstore'
        // 'svgmin'
    ]);

    grunt.registerTask('build', [
        'sass:dist',
        'autoprefixer',
        'copy',
        'includereplace:build'
    ]);

};