/*jslint node: true */
module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'assets/js/*.js', 'src/**/*.js', 'test/**/*.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    recursive: true,
                    timeout: 10000
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
};