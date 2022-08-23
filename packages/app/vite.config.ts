import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from 'vite-plugin-html'
import {defineConfig} from 'vite';

const {resolve} = require('path');
import eslint from 'vite-plugin-eslint'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis',
    },
    resolve: {
        alias: {
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6', // add buffer
            process: 'rollup-plugin-node-polyfills/polyfills/process-es6', // add process

        },
    },
    plugins: [
        eslint(),
        react(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
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
                nodeResolve(),
                rollupNodePolyFill()
            ]
        }
    }
})
