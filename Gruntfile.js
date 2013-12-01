module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      test: {
        // Use defaults
      },
      dev: {
        singleRun: false
      },
      bdd: {
        reporters: ['story', 'coverage']
      },
      cobertura: {
        reporters: ['dots', 'coverage'],
        browsers: ['PhantomJS'],
        coverageReporter: {
          type : 'cobertura',
          dir : 'coverage/'
        }
      }
    },

    requirejs: {
      'build-minified': {
        options: {
          baseUrl: ".",
          include: ['bower_components/almond/almond'],
          stubModules: ['angular', 'jquery', 'underscore'],
          mainConfigFile: 'config/require.build.js',
          name: "src/taggedInfiniteScroll",
          optimize: "uglify2",
          preserveLicenseComments: false,
          out: "build/taggedInfiniteScroll.min.js"
        }
      },
      'build-unminified': {
        options: {
          baseUrl: ".",
          include: ['bower_components/almond/almond'],
          stubModules: ['angular', 'jquery', 'underscore'],
          mainConfigFile: 'config/require.build.js',
          name: "src/taggedInfiniteScroll",
          optimize: "none",
          preserveLicenseComments: false,
          out: "build/taggedInfiniteScroll.js"
        }
      }
    }
  });

  // Run tests, single pass
  grunt.registerTask('test', 'Run unit tests', ['karma:test']);

  // Run tests continously for development mode
  grunt.registerTask('dev', 'Run unit tests in watch mode', ['karma:dev']);

  // Generate a coverage report in Cobertura format
  grunt.registerTask('cobertura', 'Run unit tests in watch mode', ['karma:cobertura']);

  // Build files for production
  grunt.registerTask('build', 'Builds files for production', ['requirejs:build-minified', 'requirejs:build-unminified']);
};
