import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import config from '../vite.config.js';
test('Vite preserves public publish root and keeps source assets separate', () => {
    assert.equal(config.build.outDir, 'public');
    assert.equal(config.publicDir, 'static');
    assert.equal(config.build.emptyOutDir, true);
    assert.ok(existsSync('static/global.css'));
    assert.ok(existsSync('static/favicon.png'));
});
