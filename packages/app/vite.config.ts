import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from 'vite-plugin-html'
import {defineConfig} from 'vite';

const {resolve} = require('path');
import eslint from 'vite-plugin-eslint'
import mkcert from 'vite-plugin-mkcert'

import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill';
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    server: {https: true},
    resolve: {
        alias: {
            buffer: 'node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js', // add buffer
            process: 'node_modules/rollup-plugin-node-polyfills/polyfills/process-es6.js', // add process
        },
    },
    plugins: [
        mkcert(),
        eslint(),
        react(),
        createHtmlPlugin({
            minify: false,
        }),
    ],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true
                }),
                NodeModulesPolyfillPlugin()
            ]
        }
    },
    build: {
        target: ['es2020'],
        minify: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            plugins: [
                nodeResolve() as Plugin,
                rollupNodePolyFill()
            ],
        }
    }
})
