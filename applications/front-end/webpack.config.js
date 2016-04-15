var path = require('path');

var _root = path.resolve(__dirname, '.');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    // Switch loaders to debug mode.
    //
    // See: http://webpack.github.io/docs/configuration.html#debug
    debug: true,

    // Cache generated modules and chunks to improve performance for multiple incremental builds.
    // This is enabled by default in watch mode.
    // You can pass false to disable it.
    //
    // See: http://webpack.github.io/docs/configuration.html#cache
    // cache: false,

    // The entry point for the bundle
    // Our Angular.js app
    //
    // See: http://webpack.github.io/docs/configuration.html#entry
    entry: {
        'polyfills': './polyfills.ts',
        'vendor': './vendor.ts',
        'main': './src/app/boot.ts'
    },

    // Options affecting the resolving of modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {

        // An array of extensions that should be used to resolve modules.
        //
        // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: ['', '.ts', '.js'],

        // Make sure root is src
        root: root('./src/app'),

        // remove other default values
        modulesDirectories: ['node_modules']

    },

    // Options affecting the normal modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#module
    module: {

        // An array of applied pre and post loaders.
        //
        // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: [

            // Tslint loader support for *.ts files
            //
            // See: https://github.com/wbuchwalter/tslint-loader
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

            // Source map loader support for *.js files
            // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
            //
            // See: https://github.com/webpack/source-map-loader
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    root('node_modules/rxjs'),
                    root('node_modules/@angular2-material')
                ]
            }

        ],

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // See: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [

            // Typescript loader support for .ts and Angular 2 async routes via .async.ts
            //
            // See: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            // Json loader support for *.json files.
            //
            // See: https://github.com/webpack/json-loader
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            // Raw loader support for *.css files
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },

            // Raw loader support for *.html
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [root('src/index.html')]
            }

        ]

    },

    // Developer tool to enhance debugging
    //
    // See: http://webpack.github.io/docs/configuration.html#devtool
    // See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    devtool: 'cheap-module-eval-source-map',

    // Options affecting the output of the compilation.
    //
    // See: http://webpack.github.io/docs/configuration.html#output
    output: {

        // The output directory as absolute path (required).
        //
        // See: http://webpack.github.io/docs/configuration.html#output-path
        path: root('build'),

        // Specifies the name of each output file on disk.
        // IMPORTANT: You must not specify an absolute path here!
        //
        // See: http://webpack.github.io/docs/configuration.html#output-filename
        filename: '[name].bundle.js',

        // The filename of the SourceMaps for the JavaScript files.
        // They are inside the output.path directory.
        //
        // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
        sourceMapFilename: '[name].map',

        // The filename of non-entry chunks as relative path
        // inside the output.path directory.
        //
        // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
        chunkFilename: '[id].chunk.js'

    },

    plugins: [],

    // Static analysis linter for TypeScript advanced options configuration
    // Description: An extensible linter for the TypeScript language.
    //
    // See: https://github.com/wbuchwalter/tslint-loader
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },

    // Webpack Development Server configuration
    // Description: The webpack-dev-server is a little node.js Express server.
    // The server emits information about the compilation state to the client,
    // which reacts to those events.
    //
    // See: https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
        port: 3000,
        host: "localhost",
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
