// test-nav.js
const fs = require('fs');
const assert = require('assert');

console.log('--- STARTING NAV REDESIGN CHECK ---');

// 1. Verify index.html structure
const html = fs.readFileSync('index.html', 'utf8');
assert(html.includes('class="brand-text">V A L O</span>'), 'ERROR: Navbar logo must be V A L O spaced');
assert(html.includes('class="nav-links"'), 'ERROR: Navbar links container nav-links must be present');
assert(html.includes('id="nav-buy-trigger"'), 'ERROR: Navbar buy button trigger ID must be present');
assert(!html.includes('SYSTEM_ACTIVE'), 'ERROR: [ SYSTEM_ACTIVE ] must be removed');
assert(html.includes('href="#social-proof-section"'), 'ERROR: Social proof nav link href must be #social-proof-section');
assert(html.includes('href="#faq-section"'), 'ERROR: FAQ nav link href must be #faq-section');
console.log('✔ index.html layout checks passed.');

// 2. Verify index.js scroll handler definition
const js = fs.readFileSync('index.js', 'utf8');
assert(js.includes('function initNavScroll'), 'ERROR: index.js must define initNavScroll function');
console.log('✔ index.js function checks passed.');
console.log('--- ALL CHECKS PASSED ---');
