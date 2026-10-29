
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.mobile-menu');
 const closeMenu=()=>{if(!toggle||!menu)return;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');menu.classList.remove('open');menu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open')};
 if(toggle&&menu){
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menu._y=window.scrollY;document.body.classList.toggle('menu-open',open)});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
  window.addEventListener('scroll',()=>{if(menu.classList.contains('open')&&Math.abs(window.scrollY-(menu._y||0))>60)closeMenu()},{passive:true});
  window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu()});
 }
 let current=location.pathname.split('/').pop()||'index.html';if(current.indexOf('service-')===0)current='services.html';
 document.querySelectorAll('.nav-links a[data-page]').forEach(a=>{if(a.dataset.page===current){a.classList.add('active');a.setAttribute('aria-current','page')}});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const progress=document.querySelector('.progress-bar');
 const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%'};
 window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
 const revealEls=document.querySelectorAll('.reveal');
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');const t=entry.target;setTimeout(()=>{t.style.transitionDelay='0s'},1000);observer.unobserve(entry.target)}}),{threshold:.12});revealEls.forEach(el=>observer.observe(el))}else revealEls.forEach(el=>el.classList.add('visible'));
 // Portfolio category filters
 const filterButtons=document.querySelectorAll('[data-filter]'),cards=document.querySelectorAll('#portfolio-grid .project-card');
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;filterButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});let n=0;cards.forEach(card=>{const all=filter==='All',show=all?(card.hasAttribute('data-featured')||card.dataset.category==='__cta'):card.dataset.category===filter;card.classList.toggle('is-hidden',!show);if(show){card.classList.add('visible');if(card.dataset.category!=='__cta')n++}});const note=document.getElementById('pf-note');if(note)note.textContent=filter==='All'?'Showing one featured site from each of '+n+' industries. Choose a category to see all its projects.':'Showing '+n+(n===1?' project':' projects')+' in '+filter+'.'}));
 // Accessible FAQ accordion
 document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=!item.classList.contains('open');item.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));btn.querySelector('span:last-child').textContent='+'}));
 // Enquiry form: keep data in the form and use a fallback if a popup is blocked.
 const contactForm=document.querySelector('#contact-form');
 if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();const msg=document.querySelector('#form-message');if(!contactForm.reportValidity())return;const d=new FormData(contactForm);const body=`*SIXRISE PROJECT ENQUIRY*\\n━━━━━━━━━━━━━━━━━━\\n• *Name:* ${d.get('name')}\\n• *Phone:* ${d.get('phone')}\\n• *Email:* ${d.get('email')}\\n• *Service:* ${d.get('service')}\\n• *Budget:* ${d.get('budget')||'Not specified'}\\n• *Industry / project type:* ${d.get('industry')||'Not specified'}\\n━━━━━━━━━━━━━━━━━━\\n*Project details:*\\n${d.get('message')}\\n━━━━━━━━━━━━━━━━━━\\nSent from SIXRISE website`;const url='https://wa.me/918669625676?text='+encodeURIComponent(body);msg.textContent='Your enquiry is ready. WhatsApp should open in a new tab; if it does not, use the link below. Your form details remain available here.';msg.classList.add('show');let popup=window.open(url,'_blank','noopener,noreferrer');if(!popup){const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Open WhatsApp with your enquiry ↗';link.className='text-link';link.style.marginTop='8px';msg.appendChild(document.createElement('br'));msg.appendChild(link)}});
 const mini=document.querySelector('#mini-project-form');
 if(mini)mini.addEventListener('submit',e=>{e.preventDefault();if(!mini.reportValidity())return;const d=new FormData(mini);const message=`*SIXRISE PROJECT STARTER*\\n━━━━━━━━━━━━━━━━━━\\n• *Name:* ${d.get('name')}\\n• *Service:* ${d.get('service')}\\n• *Project goal:* ${d.get('goal')}\\n━━━━━━━━━━━━━━━━━━\\nI would like to discuss a project.`;const url='https://wa.me/918669625676?text='+encodeURIComponent(message);const popup=window.open(url,'_blank','noopener,noreferrer');if(!popup)location.href=url});
 // Desktop pointer parallax on hero visual, with reduced-motion respect.
 const visual=document.querySelector('.hero-visual');
 if(visual&&window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){let raf=0;visual.addEventListener('mousemove',e=>{const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const card=visual.querySelector('.browser-card');if(card)card.style.translate=`${x*9}px ${y*7}px`})});visual.addEventListener('mouseleave',()=>{const card=visual.querySelector('.browser-card');if(card)card.style.translate='0 0'})}

 // ===== Premium layer =====
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches,calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 // 3D tilt + spotlight on [data-tilt]
 if(fine&&!calm){document.querySelectorAll('[data-tilt]').forEach(el=>{const max=el.classList.contains('why-panel')?4:9;
  el.addEventListener('mouseenter',()=>el.classList.add('tilting'));
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty('--ry',((x-.5)*max*2).toFixed(2)+'deg');el.style.setProperty('--rx',((.5-y)*max*2).toFixed(2)+'deg');el.style.setProperty('--mx',(x*100).toFixed(1)+'%');el.style.setProperty('--my',(y*100).toFixed(1)+'%')});
  el.addEventListener('mouseleave',()=>{el.classList.remove('tilting');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})})}
 // Hero parallax
 const hv=document.querySelector('[data-parallax]');
 if(hv&&fine&&!calm){hv.addEventListener('mousemove',e=>{const r=hv.getBoundingClientRect();hv.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));hv.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3))});hv.addEventListener('mouseleave',()=>{hv.style.setProperty('--px',0);hv.style.setProperty('--py',0)})}
 // Rotating typed words
 const rot=document.querySelector('[data-rotate]');
 if(rot){const words=rot.dataset.rotate.split('|');let w=0,c=0,del=false;if(calm){rot.textContent=words[0]}else{(function tick(){const word=words[w];c+=del?-1:1;rot.textContent=word.slice(0,c);let t=del?35:70;if(!del&&c===word.length){del=true;t=1400}else if(del&&c===0){del=false;w=(w+1)%words.length;t=300}setTimeout(tick,t)})()}}
 // Live website previews: scale 1280px-wide iframe to card width
 const previews=document.querySelectorAll('[data-preview]');
 const fit=()=>previews.forEach(box=>{const f=box.querySelector('iframe');if(!f)return;const k=box.clientWidth/1280;f.style.transform='scale('+k+')';f.style.height=(box.clientHeight/k)+'px'});
 previews.forEach(box=>{const f=box.querySelector('iframe');if(f){f.addEventListener('load',()=>{f.classList.add('ready');const sk=box.querySelector('.thumb-skeleton');if(sk)sk.style.display='none'})}});
 fit();window.addEventListener('resize',fit);window.addEventListener('load',fit);
 // Animated counters
 const counters=document.querySelectorAll('[data-count]');
 if(counters.length&&'IntersectionObserver'in window){const co=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target,to=+el.dataset.count;if(calm){el.textContent=to;co.unobserve(el);return}let n=0;const step=()=>{n+=Math.max(1,Math.ceil(to/30));if(n>=to){el.textContent=to;return}el.textContent=n;requestAnimationFrame(step)};step();co.unobserve(el)}),{threshold:.6});counters.forEach(c=>co.observe(c))}

 // Prefill contact service from ?service=
 const qs=new URLSearchParams(location.search).get('service'),sel=document.querySelector('#service');
 if(qs&&sel){[...sel.options].forEach(o=>{if(o.text.trim()===qs||o.value===qs)sel.value=o.value||o.text})}
 // Back to top
 document.querySelectorAll('.to-top').forEach(b=>b.addEventListener('click',()=>window.scrollTo({top:0,behavior:calm?'auto':'smooth'})));
 // FAQ plus sign: keep icon as '+' (rotated via CSS)
 document.querySelectorAll('.faq-x .faq-question').forEach(b=>{const pl=b.querySelector('.faq-plus');if(pl)pl.textContent='+'});
 // Portfolio: refit previews after filtering
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setTimeout(fit,30)));
});

/* Portfolio category dropdown */
(function(){function init(){var dd=document.getElementById('pf-dd');if(!dd)return;var btn=document.getElementById('pf-dd-btn'),menu=document.getElementById('pf-dd-menu'),val=document.getElementById('pf-dd-v');
function set(o){menu.hidden=!o;dd.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o))}
btn.addEventListener('click',function(){set(menu.hidden)});
menu.addEventListener('click',function(e){var b=e.target.closest('[data-filter]');if(!b)return;val.textContent=b.querySelector('span').textContent;set(false);btn.focus()});
document.addEventListener('click',function(e){if(!dd.contains(e.target))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){set(false);btn.focus()}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();

/* Service hero visuals: code typer + video timecode */
(function(){function init(){
 var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('[data-typer]').forEach(function(pre){
  var nodes=[],w=document.createTreeWalker(pre,NodeFilter.SHOW_TEXT,null);
  while(w.nextNode())nodes.push({n:w.currentNode,t:w.currentNode.nodeValue});
  if(calm)return;
  var caret=document.createElement('i');caret.className='vz-caret';
  function reset(){nodes.forEach(function(o){o.n.nodeValue=''})}
  function run(){reset();var i=0,c=0;
   (function step(){
    if(i>=nodes.length){setTimeout(run,3200);return}
    var o=nodes[i];c++;o.n.nodeValue=o.t.slice(0,c);o.n.parentNode.appendChild(caret);
    if(c>=o.t.length){i++;c=0;setTimeout(step,i<nodes.length&&nodes[i].t.length>0?70:20)}else setTimeout(step,32);
   })();}
  run();
 });
 var tc=document.querySelector('[data-tc]');
 if(tc){var f=0,p=function(n){return(n<10?'0':'')+n};
  if(!calm)setInterval(function(){f=(f+1)%(8*30);tc.textContent='00:'+p(Math.floor(f/30))+':'+p(f%30)},33)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();

// Back-to-top: show only after scrolling down
(function(){var b=document.querySelector('.to-top');if(!b)return;var t=function(){b.classList.toggle('is-visible',window.scrollY>420)};window.addEventListener('scroll',t,{passive:true});t()})();

/* Get-a-Quote popup (opens from every "Get a quote" button, including on the Contact page) */
(function(){
 function init(){
  var triggers=[].filter.call(document.querySelectorAll('a[href^="contact.html"]'),function(a){return /quote/i.test(a.textContent)&&!a.closest('.pv-btn')});
  if(!triggers.length)return;
  var WA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  var el=document.createElement('div');
  el.className='qm';el.setAttribute('aria-hidden','true');
  el.innerHTML=
  '<div class="qm-back" data-qm-close></div>'+
  '<div class="qm-dialog" role="dialog" aria-modal="true" aria-labelledby="qm-title">'+
   '<aside class="qm-side">'+
    '<span class="qm-tag qm-in" style="--i:0"><i></i>Free quote</span>'+
    '<h2 class="qm-in" style="--i:1">Let\'s plan your <em>next project.</em></h2>'+
    '<p class="qm-in" style="--i:2">Tell us what you need. We\'ll come back with a clear scope and a fair quote.</p>'+
    '<ul class="qm-points">'+
     '<li class="qm-in" style="--i:3"><b>✓</b>No obligation, no pressure</li>'+
     '<li class="qm-in" style="--i:4"><b>✓</b>Reply on WhatsApp or call</li>'+
     '<li class="qm-in" style="--i:5"><b>✓</b>Clear, practical next steps</li>'+
    '</ul>'+
    '<div class="qm-direct qm-in" style="--i:6"><small>Prefer to talk?</small>'+
     '<a href="https://wa.me/918669625676" target="_blank" rel="noopener">'+WA+'WhatsApp us</a>'+
     '<a href="tel:+918669625676"><span aria-hidden="true">☎</span>+91 86696 25676</a></div>'+
   '</aside>'+
   '<div class="qm-main">'+
    '<button class="qm-close" type="button" aria-label="Close quote form" data-qm-close>×</button>'+
    '<h3 id="qm-title" class="qm-in" style="--i:0">Get a free quote</h3>'+
    '<p class="qm-sub qm-in" style="--i:1">Takes about a minute. Fields marked * are required.</p>'+
    '<form id="qm-form" novalidate>'+
     '<div class="form-message" id="qm-message" role="status" aria-live="polite"></div>'+
     '<div class="form-grid">'+
      '<div class="field qm-in" style="--i:2"><label for="qm-name">Your name *</label><input id="qm-name" name="name" autocomplete="name" required placeholder="Full name"></div>'+
      '<div class="field qm-in" style="--i:3"><label for="qm-phone">Phone number *</label><input id="qm-phone" name="phone" type="tel" autocomplete="tel" required pattern="[0-9+()\\-\\s]{7,18}" placeholder="+91 ..."></div>'+
      '<div class="field qm-in" style="--i:4"><label for="qm-email">Email address *</label><input id="qm-email" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>'+
      '<div class="field qm-in" style="--i:5"><label for="qm-service">Service required *</label><select id="qm-service" name="service" required></select></div>'+
      '<div class="field qm-in" style="--i:6"><label for="qm-budget">Estimated budget (optional)</label><select id="qm-budget" name="budget"></select></div>'+
      '<div class="field qm-in" style="--i:7"><label for="qm-industry">Project type / industry</label><input id="qm-industry" name="industry" placeholder="Real estate, clinic, startup..."></div>'+
      '<div class="field full qm-in" style="--i:8"><label for="qm-message-box">Tell us about your project *</label><textarea id="qm-message-box" name="message" required placeholder="What would you like to build? Any goals, pages, features or deadline?"></textarea></div>'+
     '</div>'+
     '<button class="btn btn-gold btn-glow submit-btn qm-in" style="--i:9" type="submit">Submit enquiry <span>↗</span></button>'+
     '<p class="qm-note qm-in" style="--i:10">Your enquiry opens in WhatsApp. Press Send there to reach us.</p>'+
    '</form>'+
   '</div>'+
  '</div>';
  document.body.appendChild(el);

  // Same options as the Contact page form
  var services=['Website Development','Web Apps & Custom Projects','UI/UX Design','Logo & Branding','Digital Marketing / SEO','Video Editing','Photography / Photoshoot','Website Maintenance & Support','Hosting / Domain Setup','Real-Estate Pack','Other / Not sure yet'];
  var budgets=['Under ₹10,000','₹10,000–₹25,000','₹25,000–₹50,000','₹50,000–₹1,00,000','₹1,00,000+'];
  var sSel=el.querySelector('#qm-service'),bSel=el.querySelector('#qm-budget');
  sSel.add(new Option('Choose a service',''));services.forEach(function(s){sSel.add(new Option(s,s))});
  bSel.add(new Option('Prefer to discuss',''));budgets.forEach(function(b){bSel.add(new Option(b,b))});

  var form=el.querySelector('#qm-form'),msg=el.querySelector('#qm-message'),last=null,timer=0;
  function focusables(){return [].filter.call(el.querySelectorAll('a[href],button,input,select,textarea'),function(n){return !n.disabled&&n.offsetParent!==null})}
  function open(svc){
   clearTimeout(timer);el.classList.remove('is-closing');
   if(svc){[].forEach.call(sSel.options,function(o){if(o.text===svc)sSel.value=o.value})}
   last=document.activeElement;
   el.setAttribute('aria-hidden','false');document.body.classList.add('qm-open');
   void el.offsetWidth;el.classList.add('is-open');
   setTimeout(function(){var f=el.querySelector('#qm-name');if(f)f.focus({preventScroll:true})},420);
  }
  function close(){
   if(!el.classList.contains('is-open'))return;
   el.classList.add('is-closing');
   timer=setTimeout(function(){el.classList.remove('is-open','is-closing');el.setAttribute('aria-hidden','true');document.body.classList.remove('qm-open');if(last&&last.focus)last.focus({preventScroll:true})},260);
  }
  triggers.forEach(function(a){a.addEventListener('click',function(e){
   if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1)return;
   e.preventDefault();
   var svc=null;try{svc=new URL(a.getAttribute('href'),location.href).searchParams.get('service')}catch(x){}
   open(svc);
  })});
  el.addEventListener('click',function(e){if(e.target.closest('[data-qm-close]'))close()});
  document.addEventListener('keydown',function(e){
   if(!el.classList.contains('is-open'))return;
   if(e.key==='Escape'){close();return}
   if(e.key==='Tab'){var f=focusables();if(!f.length)return;var a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
    else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
  });
  form.addEventListener('submit',function(e){
   e.preventDefault();
   if(!form.reportValidity())return;
   var d=new FormData(form);
   var body='*SIXRISE PROJECT ENQUIRY*\n━━━━━━━━━━━━━━━━━━\n• *Name:* '+d.get('name')+'\n• *Phone:* '+d.get('phone')+'\n• *Email:* '+d.get('email')+'\n• *Service:* '+d.get('service')+'\n• *Budget:* '+(d.get('budget')||'Not specified')+'\n• *Industry / project type:* '+(d.get('industry')||'Not specified')+'\n━━━━━━━━━━━━━━━━━━\n*Project details:*\n'+d.get('message')+'\n━━━━━━━━━━━━━━━━━━\nSent from SIXRISE website';
   var url='https://wa.me/918669625676?text='+encodeURIComponent(body);
   msg.textContent='Your enquiry is ready. WhatsApp should open in a new tab; if it does not, use the link below.';
   msg.classList.add('show');
   var p=window.open(url,'_blank','noopener,noreferrer');
   if(!p){var l=document.createElement('a');l.href=url;l.target='_blank';l.rel='noopener';l.textContent='Open WhatsApp with your enquiry ↗';l.className='text-link';l.style.marginTop='8px';msg.appendChild(document.createElement('br'));msg.appendChild(l)}
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
