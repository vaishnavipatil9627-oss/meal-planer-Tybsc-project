const $=s=>document.querySelector(s),L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const page=document.body.dataset.p,user=L('mp_session',null);
if(page!=='login'&&!user)location.href='index.html';
const D=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const R=[
{id:1,n:"Sabudana Khichdi",v:1,t:"20 min",ing:["Sabudana 1 cup (soaked 4-6 h)","Roasted peanut powder 1/2 cup","Potatoes 2","Green chillies 2","Cumin seeds 1 tsp","Ghee 2 tbsp","Sendha namak (rock salt)","Lemon 1","Coriander leaves"],st:["Drain soaked sabudana fully; mix with peanut powder and a little salt.","Heat ghee, splutter cumin, add chillies.","Add boiled/cubed potatoes, saute 3-4 min.","Add sabudana, cook on low 5-6 min, stirring gently until translucent.","Finish with lemon and coriander."]},
{id:2,n:"Vrat Aloo Sabzi",v:1,t:"25 min",ing:["Potatoes 3 (boiled)","Ghee 1 tbsp","Cumin seeds 1 tsp","Green chillies 2","Sendha namak (rock salt)","Black pepper","Coriander leaves"],st:["Peel and cube boiled potatoes.","Heat ghee, add cumin and chillies.","Add potatoes, rock salt and pepper; toss 5 min.","Garnish with coriander."]},
{id:3,n:"Rajgira Roti",v:1,t:"20 min",ing:["Rajgira (amaranth) flour 1 cup","Boiled potato 1","Sendha namak (rock salt)","Ghee for roasting"],st:["Mash potato; knead with flour, salt and warm water into soft dough.","Roll between greased sheets into rounds.","Roast on tawa with ghee until spotted on both sides."]},
{id:4,n:"Vegetable Poha",v:0,t:"15 min",ing:["Thick poha 1.5 cups","Onion 1","Potato 1","Peanuts 2 tbsp","Mustard seeds 1 tsp","Curry leaves","Turmeric 1/4 tsp","Green chillies 2","Lemon 1","Oil 2 tbsp","Salt"],st:["Rinse poha, drain, sprinkle salt and turmeric.","Heat oil; fry peanuts, add mustard, curry leaves, chillies.","Add chopped onion and potato; cook until soft.","Add poha, mix gently, steam covered 2 min.","Add lemon and coriander."]},
{id:5,n:"Dal Tadka with Rice",v:0,t:"35 min",ing:["Toor dal 1 cup","Rice 1 cup","Tomato 2","Onion 1","Garlic 5 cloves","Cumin seeds 1 tsp","Turmeric 1/2 tsp","Red chilli powder 1/2 tsp","Ghee 2 tbsp","Salt","Coriander leaves"],st:["Pressure cook dal with turmeric and salt (3-4 whistles).","Cook rice separately.","Heat ghee, add cumin, garlic, onion, tomato; cook until soft.","Add chilli powder, pour over dal, simmer 5 min.","Serve hot with rice."]},
{id:6,n:"Masala Khichdi",v:0,t:"30 min",ing:["Rice 1/2 cup","Moong dal 1/2 cup","Mixed vegetables 1 cup","Cumin seeds 1 tsp","Turmeric 1/2 tsp","Ghee 1 tbsp","Salt"],st:["Wash rice and dal together.","Saute cumin and vegetables in ghee.","Add rice, dal, turmeric, salt and 4 cups water.","Pressure cook 3 whistles; serve with curd."]},
{id:7,n:"Chapati with Bhaji",v:0,t:"40 min",ing:["Whole wheat flour 2 cups","Seasonal vegetables 300 g","Onion 1","Tomato 1","Oil 2 tbsp","Mustard seeds 1 tsp","Turmeric 1/2 tsp","Goda masala 1 tsp","Salt"],st:["Knead flour with water, salt and oil; rest 15 min.","Make bhaji: temper mustard, add onion, tomato, vegetables and spices; cook covered.","Roll and roast chapatis.","Serve together."]},
{id:8,n:"Shingada (Singhara) Puri",v:1,t:"25 min",ing:["Singhara flour 1 cup","Boiled potato 1","Sendha namak (rock salt)","Oil/ghee for frying"],st:["Knead flour, mashed potato and salt into stiff dough.","Roll small puris.","Deep fry on medium heat until puffed."]}];
const N=['home','recipes','shopping','calendar','settings'];
if(page!=='login'){document.body.insertAdjacentHTML('afterbegin',`<header><b>🍛 Meal Planner</b><nav>${N.map(a=>`<a href="${a=='home'?'home':a}.html" class="${page==a?'on':''}">${a[0].toUpperCase()+a.slice(1)}</a>`).join('')}<a href="cook.html">Cook</a><a href="#" id="out">Logout</a></nav></header><div id="toast"></div>`);
$('#out').onclick=e=>{e.preventDefault();localStorage.removeItem('mp_session');location.href='index.html'}}
const rec=id=>R.find(r=>r.id==id);
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',8000)};
const cfg=()=>Object.assign({on:1,morning:'07:30',evening:'18:30',prep:1,preptime:'20:00',fast:'',name:user&&user.name||''},L('mp_cfg',{}));
const plan=()=>L('mp_plan',{});
function pick(d,slot){const m=(plan()[d.getDay()]||{})[slot];if(m)return m;const n=Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/864e5),u=eventsOn(d).some(e=>e.t=='u'),a=u?[1,2,3,8]:[4,5,6,7];return a[(n+(slot=='evening'?2:0))%4]}
function mealText(slot){const r=rec(pick(new Date(),slot));return r?r.n:'-'}
const PREP={1:"Soak sabudana 4-6 hours (overnight)",2:"Boil potatoes",3:"Boil potato, keep rajgira flour ready",4:"Buy fresh poha, peanuts, lemon",5:"Buy tomato/onion; soak dal 30 min before cooking",6:"Keep moong dal and vegetables ready",7:"Buy vegetables; plan to knead dough",8:"Boil potato, keep singhara flour ready"};
const tmr=()=>{const t=new Date();t.setDate(t.getDate()+1);return t};
function prepLines(t){const l=[];['morning','evening'].forEach(s=>{const r=rec(pick(t,s));if(r)l.push(r.n+': '+(PREP[r.id]||'Check ingredients, buy missing items'))});eventsOn(t).forEach(e=>l.push('Tomorrow: '+e.n+(e.t=='u'?' - keep upvas items ready (sabudana, sendha namak, potatoes, peanuts)':'')));return l}
function remind(slot,force){const c=cfg(),now=new Date(),k=`mp_fired_${D(now)}_${slot}`,tm=slot=='prep'?c.preptime:c[slot],hm=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
 if(!force&&(!c.on||(slot=='prep'&&!c.prep)||localStorage.getItem(k)||(slot=='prep'?hm<tm:hm!==tm)))return;
 localStorage.setItem(k,1);let m;if(slot=='prep'){const l=prepLines(tmr());m='🥬 Prepare for tomorrow: '+(l.join(' | ')||'nothing planned')}else m=`${slot==='morning'?'🌅 Morning':'🌙 Evening'} meal: ${mealText(slot)}`;
 toast(m);if('Notification' in window&&Notification.permission==='granted')new Notification('Meal Planner',{body:m})}
if(page!=='login'){setInterval(()=>{remind('morning');remind('evening');remind('prep')},20000)}
// festivals & upvas
const FEST=[{d:'2026-10-20',n:'Dussehra',t:'f'},{d:'2026-10-29',n:'Karwa Chauth (fast)',t:'u'},{d:'2026-11-08',n:'Diwali (Lakshmi Puja)',t:'f'},{d:'2027-03-06',n:'Maha Shivratri (fast)',t:'u'}];
for(let i=0;i<9;i++){const d=new Date(2026,9,11+i);FEST.push({d:D(d),n:'Navratri Day '+(i+1)+' (fast)',t:'u'})}
function events(){return FEST.concat(L('mp_events',[]))}
function eventsOn(d){const c=cfg(),e=events().filter(x=>x.d===D(d));if(c.fast!==''&&d.getDay()==+c.fast&&!e.some(x=>x.t=='u'))e.push({n:DAYS[d.getDay()]+' upvas',t:'u'});return e}
/* page logic */
if(page==='login'){let m='in';const sw=()=>{$('#nm').style.display=m=='up'?'block':'none';$('#go').textContent=m=='up'?'Create account':'Login';$('#sw').textContent=m=='up'?'Have an account? Login':'New here? Sign up'};
$('#sw').onclick=e=>{e.preventDefault();m=m=='in'?'up':'in';sw()};sw();
$('#go').onclick=()=>{const em=$('#em').value.trim().toLowerCase(),pw=$('#pw').value,us=L('mp_users',{});if(!em||pw.length<4)return $('#msg').textContent='Enter email and a password (min 4 chars).';
 if(m=='up'){if(us[em])return $('#msg').textContent='Account exists. Please login.';us[em]={pw:btoa(pw),name:$('#nm').value||em.split('@')[0]};S('mp_users',us)}
 else if(!us[em]||us[em].pw!==btoa(pw))return $('#msg').textContent='Wrong email or password.';
 S('mp_session',{email:em,name:us[em].name});location.href='home.html'}}
if(page==='home'){const c=cfg(),t=new Date(),ev=eventsOn(t);
$('#hi').textContent=`Namaste, ${c.name||user.name}! ${DAYS[t.getDay()]}, ${t.toLocaleDateString()}`;
$('#today').innerHTML=`<p>🌅 <b>Morning:</b> ${mealText('morning')}</p><p>🌙 <b>Evening:</b> ${mealText('evening')}</p>`+(ev.length?`<p>${ev.map(e=>`<span class="tag ${e.t=='u'?'vrat':''}">${e.n}</span>`).join(' ')}</p>`:'');
const up=events().filter(x=>x.d>D(t)).sort((a,b)=>a.d<b.d?-1:1).slice(0,3);
$('#next').innerHTML=up.map(e=>`<li>${e.d} - ${e.n}</li>`).join('')||'<li>None</li>';
const opts=s=>'<option value="">Auto</option>'+R.map(r=>`<option value="${r.id}" ${s==r.id?'selected':''}>${r.n}</option>`).join('');
const p=plan();$('#wk').innerHTML=DAYS.map((d,i)=>`<tr><td>${d}</td><td><select data-d="${i}" data-s="morning">${opts((p[i]||{}).morning)}</select></td><td><select data-d="${i}" data-s="evening">${opts((p[i]||{}).evening)}</select></td></tr>`).join('');
$('#wk').onchange=e=>{const s=e.target.dataset,pl=plan();pl[s.d]=pl[s.d]||{};pl[s.d][s.s]=e.target.value;S('mp_plan',pl);location.reload()}}
if(page==='recipes'){const draw=()=>{const q=$('#q').value.toLowerCase(),vo=$('#vo').checked;
$('#list').innerHTML=R.filter(r=>r.n.toLowerCase().includes(q)&&(!vo||r.v)).map(r=>`<div class="card"><b>${r.n}</b> <span class="tag ${r.v?'vrat':''}">${r.v?'Upvas/Vrat':'Regular'}</span> <span class="tag">${r.t}</span>
<details><summary>Ingredients & cooking steps</summary><h2>Ingredients</h2><ul>${r.ing.map(i=>`<li>${i}</li>`).join('')}</ul><h2>Steps</h2><ol>${r.st.map(i=>`<li>${i}</li>`).join('')}</ol></details>
<div class="row" style="margin-top:8px"><a href="cook.html?id=${r.id}"><button>▶ Cook</button></a><button class="g" onclick="addShop(${r.id})">+ Shopping list</button><button class="g" onclick="setMeal(${r.id},'morning')">Today morning</button><button class="g" onclick="setMeal(${r.id},'evening')">Today evening</button></div></div>`).join('')};
$('#q').oninput=draw;$('#vo').onchange=draw;draw()}
function addShop(id){const s=L('mp_shop',[]);rec(id).ing.forEach(i=>{if(!s.some(x=>x.t===i))s.push({t:i,done:0})});S('mp_shop',s);toast('Added to shopping list')}
function setMeal(id,slot){const pl=plan(),d=new Date().getDay();pl[d]=pl[d]||{};pl[d][slot]=id;S('mp_plan',pl);toast('Set for today '+slot)}
if(page==='shopping'){const draw=()=>{const s=L('mp_shop',[]);$('#items').innerHTML=s.map((x,i)=>`<li><label class="${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} onchange="tick(${i})"> ${x.t}</label></li>`).join('')||'<li>List is empty.</li>'};
window.tick=i=>{const s=L('mp_shop',[]);s[i].done^=1;S('mp_shop',s);draw()};
$('#add').onclick=()=>{const v=$('#new').value.trim();if(!v)return;const s=L('mp_shop',[]);s.push({t:v,done:0});S('mp_shop',s);$('#new').value='';draw()};
$('#fromPlan').onclick=()=>{const s=L('mp_shop',[]);for(let k=0;k<7;k++){const d=new Date();d.setDate(d.getDate()+k);['morning','evening'].forEach(sl=>rec(pick(d,sl)).ing.forEach(x=>{if(!s.some(y=>y.t===x))s.push({t:x,done:0})}))}S('mp_shop',s);draw()};
$('#clr').onclick=()=>{S('mp_shop',L('mp_shop',[]).filter(x=>!x.done));draw()};draw()}
if(page==='calendar'){let cur=new Date();cur.setDate(1);const draw=()=>{const y=cur.getFullYear(),m=cur.getMonth(),first=cur.getDay(),n=new Date(y,m+1,0).getDate(),td=D(new Date());
$('#mt').textContent=cur.toLocaleString('default',{month:'long',year:'numeric'});let h=DAYS.map(d=>`<div class="h">${d.slice(0,3)}</div>`).join('')+'<div class="h"></div>'.repeat(first);
for(let d=1;d<=n;d++){const dt=new Date(y,m,d);h+=`<div class="${D(dt)==td?'td':''}">${d}${eventsOn(dt).map(e=>`<span class="f ${e.t=='u'?'u':''}">${e.n}</span>`).join('')}</div>`}$('#cal').innerHTML=h};
$('#pv').onclick=()=>{cur.setMonth(cur.getMonth()-1);draw()};$('#nx').onclick=()=>{cur.setMonth(cur.getMonth()+1);draw()};
$('#ae').onclick=()=>{const d=$('#ed').value,n=$('#en').value.trim();if(!d||!n)return;const e=L('mp_events',[]);e.push({d,n,t:$('#et').value});S('mp_events',e);$('#en').value='';draw()};draw()}
if(page==='settings'){const c=cfg();$('#nm').value=c.name;$('#on').checked=!!c.on;$('#mo').value=c.morning;$('#ev').value=c.evening;$('#fd').value=c.fast;$('#pr').checked=!!c.prep;$('#pt').value=c.preptime;
$('#save').onclick=()=>{S('mp_cfg',{on:$('#on').checked?1:0,morning:$('#mo').value,evening:$('#ev').value,prep:$('#pr').checked?1:0,preptime:$('#pt').value,fast:$('#fd').value,name:$('#nm').value});toast('Settings saved')};
$('#perm').onclick=()=>{if(!('Notification' in window))return toast('Notifications not supported in this browser');Notification.requestPermission().then(p=>toast('Notifications: '+p))};
$('#test').onclick=()=>remind('morning',1)}

if(page==='home'){const l=prepLines(tmr());$('#prep').innerHTML=l.length?'<ul>'+l.map(x=>`<li>${x}</li>`).join('')+'</ul>':'<p>Plan tomorrow\'s meals below to get a prep list.</p>'}
if(page==='cook'){const id=new URLSearchParams(location.search).get('id'),r=rec(id),box=$('#box');
if(!r)box.innerHTML='<h1>Cooking steps</h1>'+R.map(x=>`<div class="card"><a href="cook.html?id=${x.id}">${x.n}</a> <span class="tag">${x.t}</span></div>`).join('');
else{let i=0;box.innerHTML=`<h1>${r.n}</h1><div class="card"><h2>🥬 Prepare ahead</h2><p>${PREP[r.id]||'Check ingredients'}</p><h2>Ingredients</h2><ul style="list-style:none;padding:0">${r.ing.map(x=>`<li><label><input type="checkbox"> ${x}</label></li>`).join('')}</ul></div><div class="card"><div class="bar"><i id="pg"></i></div><div class="step" id="st"></div><div class="row"><button class="g" id="pv">Back</button><button id="nx">Next</button></div></div>`;
const d=()=>{$('#st').innerHTML=`<small>Step ${i+1} of ${r.st.length}</small><br>${r.st[i]}`;$('#pg').style.width=(i+1)/r.st.length*100+'%';$('#nx').textContent=i==r.st.length-1?'Done ✓':'Next'};
$('#pv').onclick=()=>{if(i>0)i--;d()};$('#nx').onclick=()=>{if(i<r.st.length-1)i++;else toast('Wah! Jevan tayar 🎉');d()};d()}}
function makeICS(){const c=cfg(),pad=n=>String(n).padStart(2,'0'),ts=(d,t)=>D(d).replace(/-/g,'')+'T'+t.replace(':','')+'00',st=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z',o=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MealPlanner//EN'];let u=0;
const ev=(d,t,s,x)=>o.push('BEGIN:VEVENT','UID:mp'+(u++)+'@mealplanner','DTSTAMP:'+st,'DTSTART:'+ts(d,t),'DURATION:PT15M','SUMMARY:'+s,'DESCRIPTION:'+x.replace(/\n/g,'\\n'),'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+s,'TRIGGER:PT0M','END:VALARM','END:VEVENT');
for(let i=0;i<60;i++){const d=new Date();d.setDate(d.getDate()+i);const t=new Date(d);t.setDate(t.getDate()+1);
['morning','evening'].forEach(s=>{const r=rec(pick(d,s));if(r)ev(d,c[s],(s=='morning'?'Morning: ':'Evening: ')+r.n,r.ing.join(', '))});const l=prepLines(t);if(l.length&&c.prep)ev(d,c.preptime,'Prepare for tomorrow',l.join('\n'))}
o.push('END:VCALENDAR');const e=document.createElement('a');e.href=URL.createObjectURL(new Blob([o.join('\r\n')],{type:'text/calendar'}));e.download='meal-reminders.ics';e.click()}
if(page==='settings')$('#ics').onclick=makeICS;

if(page==='login'&&user)location.href='home.html';
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js');

if(page==='home'&&!localStorage.mp_setup){document.querySelector('main').insertAdjacentHTML('afterbegin','<div class="card" id="setup"><b>Turn on automatic reminders (one time)</b><p>After this, you do not need to select anything. The app suggests meals and reminds you a day before to prepare ingredients.</p><div class="row"><button id="s1">1. Allow notifications</button><button class="g" id="s2">2. Add to phone calendar</button><button class="g" id="s3">Done</button></div></div>');
$('#s1').onclick=()=>'Notification' in window?Notification.requestPermission().then(p=>toast('Notifications: '+p)):toast('Not supported in this browser');$('#s2').onclick=makeICS;$('#s3').onclick=()=>{localStorage.mp_setup=1;$('#setup').remove()}}
if(page!=='login')remind('prep');
