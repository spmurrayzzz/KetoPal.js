module.exports = {
    options: {
        banner: '<%= banner %>',
        sourceMap: 'assets/js/keto-pal.min.map',
        sourceMappingURL: 'assets/js/keto-pal.min.map',
        sourceMapPrefix: 1
    },
    dist: {
        src: 'assets/js/keto-pal.js',
        dest: 'assets/js/keto-pal.min.js'
    }
}
