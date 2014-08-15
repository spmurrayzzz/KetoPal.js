module.exports = {
    options: {
        sourcesContent: true
    },
    target: {
        files: {
            'assets/js/keto-pal.js': [
                'bower_components/shout/shout.js',
                'bower_components/mustache/mustache.js',
                'src/lib/module.js',
                'src/**/*.js'
            ]
        }
    }
};
