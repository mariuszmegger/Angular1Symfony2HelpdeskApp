module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		watch: {
			live: {
				files: ['src/HelpdeskBundle/Resources/views/parts/**/*', 'web/bundles/templates/**', 'src/HelpdeskBundle/Resources/views/*', 'src/HelpdeskBundle/Resources/public/js/*.js', 'src/HelpdeskBundle/Resources/public/css/*.css'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['src/HelpdeskBundle/Resources/public/css/scss/**'],
				tasks: ['sass']
			},
			concat:{
				files: ['src/HelpdeskBundle/Resources/public/js/**'],
				tasks:['concat']
			},
			uglify:{
				files: ['src/HelpdeskBundle/Resources/public/js/**'],
				tasks:['uglify']
			}
		},
		sass: {
			options: {
			},
			dev: {
				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd: 'src/HelpdeskBundle/Resources/public/css/scss',      // Src matches are relative to this path.
						src: ['*.scss'], // Actual pattern(s) to match.
						dest: 'src/HelpdeskBundle/Resources/public/css',   // Destination path prefix.
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
			options : {
				beautify : true,
				mangle   : false
			},
			build: {
				src: 'src/HelpdeskBundle/Resources/public/js/concated.js',
				dest: 'src/HelpdeskBundle/Resources/public/js/application.min.js'
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/HelpdeskBundle/Resources/public/css',
					src: ['*.css', '!*.min.css'],
					dest: 'src/HelpdeskBundle/Resources/public/css',
					ext: '.min.css'
				}]
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['src/HelpdeskBundle/Resources/public/js/app.js',
				'src/HelpdeskBundle/Resources/public/js/controllers/CategoriesController.js',
				'src/HelpdeskBundle/Resources/public/js/controllers/DashboardController.js',
				'src/HelpdeskBundle/Resources/public/js/controllers/OperatorsController.js',
				'src/HelpdeskBundle/Resources/public/js/controllers/UsersController.js',
			 	'src/HelpdeskBundle/Resources/public/js/directives.js',
		  	'src/HelpdeskBundle/Resources/public/js/services.js',
		  	'src/HelpdeskBundle/Resources/public/js/filters.js'
				],
				dest: 'src/HelpdeskBundle/Resources/public/js/concated.js',
			},
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Default task(s).
	grunt.registerTask('default', ['watch']);



};
