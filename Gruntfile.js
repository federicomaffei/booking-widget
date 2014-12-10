/*jslint node: true */
module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');

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
        },
        nodemon: {
            dev: {
                script: 'app.js'
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'mochaTest', 'nodemon']);
    grunt.registerTask('test', ['mochaTest']);
};