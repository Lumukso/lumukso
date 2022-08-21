import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vite';
const { resolve } = require('path')

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
        react(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html')
            }
        }
    }
})