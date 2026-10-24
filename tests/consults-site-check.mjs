// Native Node.js smoke and regression tests. Run: node tests/consults-site-check.mjs
// No dependencies, paid services, credentials or network requests.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';

const read = path => readFileSync(path,'utf8');
const pages = [
 'index.html','en/index.html',
 'plc-programmering/index.html','en/plc-programming/index.html',
 'hmi-scada/index.html','en/hmi-scada/index.html',
 'plc-fejlfinding/index.html','en/plc-troubleshooting/index.html',
 'viden/index.html','en/insights/index.html',
 'viden/forbered-plc-opgave/index.html','en/insights/prepare-plc-project/index.html',
 'viden/wincc-alarmer/index.html','en/insights/wincc-alarm-review/index.html'
];
const sitemap = read('sitemap.xml');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(locations.length,14,'Sitemap must contain 14 URLs');
assert.equal(new Set(locations).size,14,'Sitemap URLs must be unique');
const expectedUrl = path=>'https://consults.dk/'+path.replace(/index\.html$/,'');
for(const path of pages){
 const html=read(path),url=expectedUrl(path);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' must have one H1');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,path+' canonical');
 assert(html.includes('rel="canonical" href="'+url+'"'),path+' canonical URL');
 assert(html.includes('hreflang="da"')&&html.includes('hreflang="en"'),path+' alternate languages');
 assert(html.includes('logo-clean.svg'),path+' clean SVG logo');
 assert(!html.includes('assets/logo.png'),path+' obsolete glowing PNG reference');
 assert(locations.includes(url),path+' must appear in sitemap');
}
assert(!existsSync('assets/option-a.css'),'Rejected split-layout stylesheet should not exist');
const logo=read('assets/logo-clean.svg');
assert(logo.includes('<svg')&&logo.includes('CONSULTS'),'SVG branding');
assert(!/feGaussianBlur|drop-shadow|<filter\b/i.test(logo),'No glow or drop shadow');

class MockFormData{
 constructor(form){this.form=form;}
 get(name){return this.form.values[name]??'';}
}
async function verifyForm(path,locale){
 const html=read(path);
 assert(!html.includes('option-a.css'),path+' original centered layout');
 assert(html.includes('class="hero-copy"')&&html.includes('class="hero-fig"'),path+' original hero');
 for(const field of ['firma','navn','email','tlf','emne','besked','website','copyToSender']){
  assert(html.includes('name="'+field+'"'),path+' required field '+field);
 }
 assert(html.includes('onclick="copyEnquiry(this.form)"'),path+' manual copy fallback');
 assert(html.includes('type="checkbox" value="yes"'),path+' opt-in checkbox exists');
 assert(!html.includes('type="checkbox" value="yes" checked'),path+' opt-in must not default on');
 assert(html.includes('role="status"')&&html.includes('aria-live="polite"'),path+' status accessibility');
 const source = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert(source,path+' inline script');
 new Script(source,{filename:path});
 const start=source.indexOf('function getEnquiry(f) {');
 assert(start>=0,path+' contact methods');
 const contact=source.slice(start);
 const status={textContent:'',style:{}};
 const button={disabled:false,textContent:''};
 const messages=[];
 const clipboard={writeText:async text=>messages.push(text)};
 const document={
  getElementById:name=>name==='form-status'?status:{value:''},
  querySelectorAll:()=>[{classList:{remove(){}}}]
 };
 const form={
  values:{
   firma:'Factory A/S',navn:'Test Contact',email:'test@example.com',tlf:'',
   emne:'PLC software',besked:'Please help with a Siemens PLC project.',
   website:'',copyToSender:''
  },
  reportValidity:()=>true,
  querySelector:()=>button,
  reset(){this.resetCount=(this.resetCount||0)+1;}
 };
 let responseIsOk=true;
 let serverResult={ok:true,copyRequested:false,copySent:false};
 let sent;
 const transport=async(url,options)=>{
  sent={url,options};
  return responseIsOk
    ?{ok:true,json:async()=>serverResult}
    :{ok:false,json:async()=>({ok:false})};
 };
 const functions=new Function('FormData','fetch','document','navigator','CONTACT_EMAIL',
  contact+'\nreturn {submitEnquiry,copyEnquiry};'
 )(MockFormData,transport,document,{clipboard},'info@consults.dk');
 // Default: owner receives enquiry, no customer copy.
 await functions.submitEnquiry(form);
 assert.equal(sent.url,'https://solidtecdk-statistics-service.vercel.app/api/contact',path+' shared SMTP API');
 assert.equal(sent.options.method,'POST');
 let payload=JSON.parse(sent.options.body);
 assert.equal(payload.lang,locale,path+' language route');
 assert.equal(payload.email,'test@example.com');
 assert.equal(payload.firma,'Factory A/S');
 assert.equal(payload.copyToSender,false,path+' default is off');
 assert.equal(form.resetCount,1,path+' success clears form');
 assert.match(status.textContent,/sent|sendt/i,path+' success feedback');
 // Opt-in: copy is delivered after owner mail.
 form.values.copyToSender='yes';
 serverResult={ok:true,copyRequested:true,copySent:true};
 await functions.submitEnquiry(form);
 payload=JSON.parse(sent.options.body);
 assert.equal(payload.copyToSender,true,path+' opt-in included in payload');
 assert.equal(form.resetCount,2,path+' owner+copy success clears form');
 assert.match(status.textContent,/copy was sent|kopi er sendt/i,path+' customer copy feedback');
 // Owner succeeds, but copy fails: no duplicate-provoking server failure.
 serverResult={ok:true,copyRequested:true,copySent:false};
 await functions.submitEnquiry(form);
 assert.equal(form.resetCount,2,path+' partial failure retains fields');
 assert.match(status.textContent,/could not|kunne ikke/i,path+' copy failure feedback');
 await functions.copyEnquiry(form);
 assert(messages.some(s=>s.includes('To: info@consults.dk')),path+' manual copy fallback');
 // Owner delivery fails entirely: fields remain intact.
 responseIsOk=false;
 await functions.submitEnquiry(form);
 assert.equal(form.resetCount,2,path+' failed submission retains data');
 assert.match(status.textContent,/could not|kunne ikke/i,path+' error feedback');
 assert.equal(button.disabled,false,path+' re-enable button');
}
await verifyForm('index.html','da');
await verifyForm('en/index.html','en');
console.log('CONSULTS checks passed: 14 pages, original layout, crisp logo, bilingual optional copy and error recovery.');
