import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';
const root = process.argv[2] || '.';
const expectedSite = ['.nojekyll', 'index.html', 'release.json', 'robots.txt'];
const allowedRoot = [...expectedSite, '.git', '.github', 'DEPLOYMENT.md', 'README.md', 'verify-release.mjs'].sort();
assert.deepEqual((await readdir(root)).sort(), allowedRoot, 'Repository root contains only reviewed deployment/support paths');
const release = JSON.parse(await readFile(`${root}/release.json`, 'utf8'));
assert.equal(release.channel, 'experimental-public-test');
assert.equal(release.publishing_root, '/');
assert.deepEqual(Object.keys(release.assets).sort(), ['.nojekyll', 'index.html', 'robots.txt']);
for (const [name, asset] of Object.entries(release.assets)) {
  const bytes = await readFile(`${root}/${name}`);
  assert.equal(bytes.length, asset.bytes, `${name} byte count`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${name} SHA-256`);
}
const html = await readFile(`${root}/index.html`, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Exactly one self-contained script');
new Script(scripts[0][1]);
const digest = createHash('sha256').update(scripts[0][1]).digest('base64');
assert.ok(html.includes(`script-src 'sha256-${digest}'`), 'CSP hash matches executable bytes');
assert.ok(html.includes("connect-src 'none'"), 'No outbound application connections');
assert.ok(html.includes('PUBLIC TEST PREVIEW'), 'Visible experimental release label');
assert.ok(html.includes(release.build), 'Release identity matches runtime');
assert.ok(!/(?:src|href)=["']https?:/i.test(html), 'No remote runtime assets');
for (const pattern of [/drive\.google\.com/i, /docs\.google\.com/i, /private[-_](?:development|developmemt)/i, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, /gh[pousr]_[A-Za-z0-9]{20,}/, /github_pat_[A-Za-z0-9_]+/, /sk-proj-[A-Za-z0-9_-]+/, /PRIVATE PROTOTYPE/]) {
  assert.ok(!pattern.test(html), `Disallowed private data pattern: ${pattern}`);
}
console.log(JSON.stringify({ build: release.build, publishingRoot: '/', artifactIntegrity: 'PASS', inlineJavaScriptSyntax: 'PASS', cspHash: 'PASS', privateDataPatternScan: 'PASS', browserAcceptance: 'NOT_TESTED', fileCount: expectedSite.length }, null, 2));
