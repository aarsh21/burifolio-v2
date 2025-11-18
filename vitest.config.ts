/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
import path from 'path'

export default getViteConfig({
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
        alias: {
            'astro:content': path.resolve(__dirname, './src/mocks/astro-content.ts'),
        },
    },
})
