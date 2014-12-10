/*jslint node: true */
module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'assets/js/*.js', 'src/**/*.js', 'test/**/*.js']
        }
    });

    grunt.registerTask('default', ['jshint', 'npm test']);
};