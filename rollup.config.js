// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

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
        resolve({
            jsnext: true,
            main: true,
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