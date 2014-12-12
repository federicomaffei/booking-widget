module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        jshint: {
                options: {
                    jshintrc: '.jshintrc'
            },
            files: ['Gruntfile.js', './*.js', 'src/**/*.js', 'test/**/*.js']
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
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3000'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'mochaTest']);
    grunt.registerTask('run', ['nodemon']);
    grunt.registerTask('test', ['mochaTest']);
};