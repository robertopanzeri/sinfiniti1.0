var path = require('path'); //no need to install path, it's already part of Node

module.exports = {
    entry: {
        App: "./app/assets/scripts/app.js",
        Vendor: "./app/assets/scripts/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"), //generates an absolute path, needed by webpack
        filename: "[name].js"
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            test: /\.js$/, //apply it just to js files
            exclude: /node_modules/ //exclude libraries, just apply webpack to my own code
        }]
    }
};