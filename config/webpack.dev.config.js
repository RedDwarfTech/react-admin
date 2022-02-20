const path = require('path');
const webpack = require( 'webpack' ) ,
config = require( './webpack.base.config' );

config.devtool = 'source-map';
//config.watch = true;

module.exports = config;
