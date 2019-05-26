const rollupResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble');
const sizes = require('rollup-plugin-sizes');
const postcss = require('rollup-plugin-postcss');


// Rollup removes local variables unless used within a module.
// This plugin makes sure specified local variables are preserved
// and kept local. This plugin wouldn't be necessary if es2015
// modules would be used.
function rawjs(opts) {
  opts = opts || {}
  return {
    transform: (code, id) => {
      var variable = opts[id.split('/').pop()]
      if (!variable) return code

      var keepStr = '/*rollup-keeper-start*/window.tmp=' + variable +
        ';/*rollup-keeper-end*/'
      return code + keepStr
    },
    transformBundle: (code) => {
      for (var file in opts) {
        var r = new RegExp(opts[file] + '\\$\\d+', 'g')
        code = code.replace(r, opts[file])
      }
      var re = /\/\*rollup-keeper-start\*\/.*\/\*rollup-keeper-end\*\//g
      return code.replace(re, '')
    }
  }
}

module.exports = {
	input: './src/index.js',
	plugins: [
		rollupResolve(),
		postcss({
			extensions: [ '.css' ],
		}),
		rawjs({
		'viewmanager.js': 'viewManager'
		}),
		rollupBabel(),
		buble(),
		sizes()
	],
	output: [
		{
			name: 'namebndl',
			format: 'iife',
			file: './lib/index.js',
			sourcemap: false
		}
	]
}