import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseReviews, exportImage} from '../src/reviews.ts';
const review = {reviewer: 'Synthetic Reviewer', date_reviewed: '01/02/2026', star_rating: 4, message: '<b>Fixture only</b>', order_id: 1};
test('valid and empty arrays preserve strings and additional CSV fields', () => {
    assert.deepEqual(parseReviews('[]'), []);
    assert.deepEqual(parseReviews(JSON.stringify([review])), [review]);
    assert.equal(parseReviews(JSON.stringify([{...review, extra: 'kept'}]))[0].extra, 'kept');
});
test('malformed JSON, shapes and invalid field types are rejected', () => {
    for (const value of ['broken', '{}', 'null', '[null]', '[[]]', '[{}]']) assert.throws(() => parseReviews(value));
    for (const update of [{reviewer: 1}, {message: null}, {date_reviewed: false}, {star_rating: 0}, {star_rating: 6}, {star_rating: 1.5}, {order_id: -1}, {order_id: '1'}, {order_id: Number.MAX_SAFE_INTEGER + 1}]) {
        assert.throws(() => parseReviews(JSON.stringify([{...review, ...update}])));
    }
});
test('export waits for DOM update, then captures, saves and restores', async () => {
    const events = []; const node = {};
    await exportImage({node, tick: async () => events.push('tick'), capture: async n => {assert.equal(n,node); events.push('capture'); return 'data:image/png';}, save: () => events.push('save'), setBusy: x => events.push(x)});
    assert.deepEqual(events, [true, 'tick', 'capture', 'save', false]);
});
test('capture, DOM and download failures all restore controls and can retry', async () => {
    for (const failing of ['tick', 'capture', 'save']) {
        const states = []; const options = {node: {}, tick: async () => {}, capture: async () => 'image', save() {}, setBusy: x => states.push(x)};
        options[failing] = () => {throw Error('synthetic failure');};
        await assert.rejects(exportImage(options), /synthetic failure/); assert.deepEqual(states, [true,false]);
        options[failing] = async () => 'image'; await exportImage(options); assert.deepEqual(states, [true,false,true,false]);
    }
});
