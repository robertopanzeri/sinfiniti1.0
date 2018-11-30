var path = require('path'); //no need to install path, it's already part of Node

module.exports = {
    mode: "production",
    entry: {
        app: "./app/assets/scripts/app.js",
        vendor: "./app/assets/scripts/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"), //generates an absolute path, needed by webpack
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/, //apply it just to js files
            exclude: /node_modules/, //exclude libraries, just apply webpack to my own code
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
                /*["env", {
                    "targets": {
                      // The % refers to the global coverage of users from browserslist
                      "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
                    }
                  }]*/
            }
        }]
    }
};