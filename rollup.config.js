// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

// colors
import 'colors';

const env = process.env.NODE_ENV || 'develoment';
console.log(env.rainbow);

export default {
    entry: 'src/scripts/main.js',
    dest: 'build/scripts/index.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        postcss({
            plugins: [
                simplevars(),
                nested(),
                cssnext({
                    warnForDuplicates: false
                }),
                cssnano()
            ],
            extendsions: ['.css']
        }),
        resolve({
            jsnext: true,
            index: true,
            browser: true
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
        eslint({
            exclude: [
                'src/styles/**'
            ]
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(env)
        }),
        (env === 'production' && uglify())
    ]
}