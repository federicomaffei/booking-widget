module.exports = function(grunt){

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'assets/js/*.js', 'src/**/*.js', 'test/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};