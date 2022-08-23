import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vite';
const { resolve } = require('path');
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis',
    },
    resolve: {
        alias: {
            process: 'process/browser',
            util: 'util',
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
            target: 'es2020'
        }
    },
    build: {
        target: [ 'es2020' ],
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        }
    }
})
