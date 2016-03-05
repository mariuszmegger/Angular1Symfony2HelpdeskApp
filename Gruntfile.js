module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
        live: {
          files: ['src/HelpdeskBundle/Resources/views/parts/**/*', 'src/HelpdeskBundle/Resources/views/*', 'src/HelpdeskBundle/Resources/js/*.js', 'src/HelpdeskBundle/Resources/css/*.css'],
          options: {  
            livereload: true
          }
        },
        sass: {
          files: ['src/HelpdeskBundle/Resources/css/scss/*'],
          tasks: ['sass']
        }
    },
    sass: {
        options: {
        },
        dev: {
            files: [
                {
          expand: true,     // Enable dynamic expansion.
          cwd: 'src/HelpdeskBundle/Resources/css/scss/',      // Src matches are relative to this path.
          src: ['*.scss'], // Actual pattern(s) to match.
          dest: 'src/HelpdeskBundle/Resources/css/',   // Destination path prefix.
          ext: '.css',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }
            ]
        }
//        prod: {
//            files: {
//                src: 'css/**',
//                dest: 'css/stylesheets/style_prod.css'
//            }
//        }
    },
    uglify: {
      build: {
        src: 'src/HelpdeskBundle/Resources/js/app.js',
        dest: 'src/HelpdeskBundle/Resources/js/app.min.js'
      }
    },
      cssmin: {
          target: {
              files: [{
                  expand: true,
                  cwd: 'css/stylesheets',
                  src: ['*.css', '!*.min.css'],
                  dest: 'css/stylesheets',
                  ext: '.min.css'
              }]
          }
      }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('do_ugly', ['uglify']);
  grunt.loadNpmTasks('grunt-contrib-cssmin');

};