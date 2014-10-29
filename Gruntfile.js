module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    concat_css: {
        options: {
          // Task-specific options go here.
        },
        all: {
          src: [
                "/**/*.css",
                "/**/*.css",
          ],
          dest: "css/build/styles.css"
        },
    },
     concat: {
        css: {
           src: [
                 'css/bootstrap.min.css',
                 'css/bootstrap.min-flat.css',
                 'css/chosen.min.css'     
                ],
            dest: 'css/build/styles.css'
        },
        js : {
            src : [
               'js/jquery-2.1.1.min.js', // All JS in the libs folder
                  'js/chosen.jquery.min.js', // All JS in the libs folder
                  'js/bootstrap.min.js', // All JS in the libs folder
                  'js/*.js', // All JS in the libs folder                    
                  'js/*.json', // All JS in the libs folder
            ],
            dest: 'js/build/production.js',
        }
    },
    concat: { 

          dist: {
              src: [
                  'js/jquery-2.1.1.min.js', // All JS in the libs folder
                  'js/chosen.jquery.min.js', // All JS in the libs folder
                  'js/bootstrap.min.js', // All JS in the libs folder
                  'js/*.js', // All JS in the libs folder                    
                  'js/*.json', // All JS in the libs folder
              ],
              dest: 'js/build/production.js',
          }
    },
    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
    },
    watch: {
        scripts: {
            files: ['js/*.js'],
            files: ['css/*.css'],            
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false,
            },
        } 
    }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat','uglify']);

};