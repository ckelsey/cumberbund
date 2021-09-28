import * as path from 'path';

import { rollup } from 'rollup';
const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const ENTRY_FILE = `src/dom/web-components/test-component/test-component.ts`;

const rollupConfig = {
    inputOptions: {
        treeshake: true,
        input: ENTRY_FILE,
        external: [],
        plugins: [
            typescript2({
                check: false,
                cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'),
                useTsconfigDeclarationDir: true
            }),
            resolve()
        ],
        onwarn(warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') { return; }
            console.log("Rollup warning: ", warning.message);
        }
    },
    outputOptions: {
        sourcemap: true,
        exports: 'named',
        file: 'public/test-component.js',
        format: 'es'
    }
}

function rollupBuild({ inputOptions, outputOptions }): Promise<any> {
    return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

rollupBuild(rollupConfig);