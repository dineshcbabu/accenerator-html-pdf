module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //beautify: true,
        mangle : true, 
        compress : true 
      },
      build: {
        src:['index.js'],
        dest: 'index.min.js'
      }
    },
    concat:{
      js:{ 
        src:['public/javascripts/index.js', 'public/javascripts/index2.js'],
        dest:'build/js/scripts.js'
      },
      css:{ 
        src:['public/stylesheets/style.css', 'public/stylesheets/style2.css'],
        dest:'build/css/styles.css'
      }
    },
    watch: {
     js:{
       files:['public/**/*.js'],
       tasks:['concat:js']// just js
     },
     css:{
       files:['public/**/*.css'],
       tasks:['concat']// both
     } 
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};