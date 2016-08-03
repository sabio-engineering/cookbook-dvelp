yaml = require('js-yaml');
fs = require('fs');

// Set configuration variables from local config.yml or CI ENV variables
if(process.env.IS_CI) {
  if(process.env.CIRCLE_BRANCH == 'master') {
    var environment = 'PRODUCTION';
  } else {
    var environment = 'STAGING';
  }
  var deployConfig = {};
  deployConfig[':api_key'] = process.env[environment + '_SHOPIFY_API_KEY'];
  deployConfig[':password'] = process.env[environment + '_SHOPIFY_PASSWORD'];
  deployConfig[':store'] = process.env[environment + '_SHOPIFY_STORE'];
} else {
  var deployConfig = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
}

try {
  var required_keys = [':api_key', ':password', ':store'];
  required_keys.forEach(function(key) {
    if (!deployConfig[key] || deployConfig[key].trim().length === 0) {
      console.error('Please set ' + key + ' variable.');
    }
  });
} catch (e) {
  console.error('An error occured while reading the configuration.');
  console.error(e);
}

module.exports = function(grunt) {
  grunt.initConfig({
    // Run autoprefixer on sass files
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: [
              '> 0.5%',
              'last 2 versions',
              'Firefox ESR',
              'Opera 12.1',
              'ie >6'
            ]
          })
        ]
      },
      dist: {
        files: [
          {
            src: 'assets/postcss/*.css',
            dest: 'assets/',
            expand: true,
            flatten: true
          }
        ]
      }
    },

    // Compile sass files
    sass: {
      compile: {
        options: {
          sourcemap: 'none',
          style: 'compressed',
          loadPath: 'assets/sass/vendor',
        },
        files: [
          {
            expand: true,
            cwd: 'assets/sass',
            src: ['**/*.scss'],
            dest: 'assets/postcss',
            ext: '.css',
          }
        ],
      },
    },

    // Configuration for deploying to shopify
    shopify: {
      options: {
        api_key: deployConfig[':api_key'],
        password: deployConfig[':password'],
        url: deployConfig[':store'],
        theme: deployConfig[':theme_id'],
        disable_growl_notifications: false,
      },
    },

    // Create SVG sprite
    svgstore: {
      options: {
        cleanupdefs: true,
      },
      default : {
        files: {
          'snippets/icons.svg.liquid': ['assets/svgs/*.svg']
        },
      },
    },

    // Move assets from images/assets to primary assets directory
    sync: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'assets/images',
            src: ['**'],
            dest: 'assets',
          },
        ],
        verbose: true,
      },
    },

    // Uglify javascripts
    uglify: {
      my_target: {
        files: {
          'assets/application.js': [
            'assets/javascripts/vendor/jquery/*.js',
            'assets/javascripts/vendor/**/*.js',
            'assets/javascripts/public/**/*.js'
          ]
        },
      },
    },

    // Watch for changes to files and run the associated tasks
    watch: {
      css: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
      },
      shopify: {
        files: [
          'assets/*',
          'config/**',
          'layout/**',
          'locales/**',
          'snippets/**',
          'templates/**',
        ],
        tasks: ['shopify'],
      },
      svgstore: {
        files: ['assets/svgs/*.svg'],
        tasks: ['svgstore'],
      },
      sync: {
        files: ['assets/images/**'],
        tasks: ['sync'],
      },
      uglify: {
        files: ['assets/javascripts/**/*.js'],
        tasks: ['uglify'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default',
    ['sync', 'sass', 'postcss', 'uglify', 'svgstore', 'watch']
  );
  grunt.registerTask('deploy',
    ['sync', 'sass', 'postcss', 'uglify', 'svgstore', 'shopify:upload']
  );
};
