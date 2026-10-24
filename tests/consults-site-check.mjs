// Node.js built-in contract checks; no dependencies or network access.
// Run: node tests/consults-site-check.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const pages = [
 ['index.html','da'],['en/index.html','en']
];
const required = ['name="firma"','name="navn"','name="email"','name="opstart"','name="arbejdsform"','name="emne"','name="besked"','onclick="copyEnquiry(this.form)"','function getEnquiry(f)','function sendMail(f)','function submitEnquiry(f)','CONTACT_FORM_ACCESS_KEY = \'\'','class="hero-fig"','assets/option-a.css'];
for (const [path,lang] of pages){
 const html=readFileSync(path,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' h1');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,path+' canonical');
 assert(html.includes('lang="'+lang+'"'),path+' language');
 for (const value of required) assert(html.includes(value),path+' missing '+value);
 assert(html.includes('mailto:'),path+' safe fallback');
 assert(!html.includes('type="submit">Send forespørgsel'),path+' send not falsely advertised');
 assert(html.includes('Mangler I PLC-')||html.includes('Need PLC or HMI'),path+' tailored headline');
}
const stylesheet=readFileSync('assets/option-a.css','utf8');
assert(stylesheet.includes('@media(min-width:1121px)'),'desktop split');
assert(stylesheet.includes('@media(max-width:560px)'),'mobile design');
const sitemap=readFileSync('sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,14,'sitemap must retain 14 URLs');
console.log('CONSULTS site checks passed (2 language variants, 14 sitemap URLs)');
