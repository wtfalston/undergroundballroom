import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SITE_CONTENT,
  verifyPassword,
  exportContentAsJSON,
  importContentFromJSON
} from './contentStore';

test('DEFAULT_SITE_CONTENT contains valid initial data', () => {
  assert.equal(DEFAULT_SITE_CONTENT.title, 'Underground Ballroom');
  assert.ok(DEFAULT_SITE_CONTENT.tracks.length >= 19, 'Tracks list has at least 19 tracks');
  assert.ok(DEFAULT_SITE_CONTENT.tales.length >= 26, 'Tales list has at least 26 tales');
  assert.equal(DEFAULT_SITE_CONTENT.leftSectionTitle, 'Lyrics');
  assert.equal(DEFAULT_SITE_CONTENT.rightSectionTitle, 'Tales');
});

test('verifyPassword handles valid and invalid passwords accurately', () => {
  assert.equal(verifyPassword('Coppola1979', 'Coppola1979'), true);
  assert.equal(verifyPassword(' Coppola1979 ', 'Coppola1979'), true);
  assert.equal(verifyPassword('wrong', 'Coppola1979'), false);
  assert.equal(verifyPassword('', 'Coppola1979'), false);
});

test('export and import JSON preserves content integrity', () => {
  const json = exportContentAsJSON(DEFAULT_SITE_CONTENT);
  assert.ok(typeof json === 'string');
  const imported = importContentFromJSON(json);
  assert.equal(imported.title, DEFAULT_SITE_CONTENT.title);
  assert.equal(imported.tracks.length, DEFAULT_SITE_CONTENT.tracks.length);
  assert.equal(imported.tales.length, DEFAULT_SITE_CONTENT.tales.length);
});

test('importContentFromJSON rejects malformed data', () => {
  assert.throws(() => {
    importContentFromJSON('not json');
  });
  assert.throws(() => {
    importContentFromJSON(JSON.stringify({ tracks: [] }));
  });
});
