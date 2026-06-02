(function(){
  const nav=document.querySelector('[data-nav]'); const toggle=document.querySelector('[data-menu-toggle]');
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{ if(a.getAttribute('href')===page) a.classList.add('active'); });
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}

  const themeBtn=document.querySelector('[data-theme-toggle]');
  const savedTheme=localStorage.getItem('cbc-theme');
  const prefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(mode){
    document.body.classList.toggle('dark-mode', mode==='dark');
    if(themeBtn){
      themeBtn.querySelector('.theme-icon').textContent=mode==='dark'?'☀':'☾';
      themeBtn.querySelector('.theme-label').textContent=mode==='dark'?'Light':'Dark';
      themeBtn.setAttribute('aria-label', mode==='dark'?'Switch light mode':'Switch dark mode');
    }
  }
  applyTheme(savedTheme || (prefersDark?'dark':'light'));
  if(themeBtn){themeBtn.addEventListener('click',()=>{const next=document.body.classList.contains('dark-mode')?'light':'dark';localStorage.setItem('cbc-theme',next);applyTheme(next);});}

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  document.querySelectorAll('.service-open').forEach(btn=>btn.addEventListener('click',()=>{
    const panel=btn.parentElement.querySelector('.service-details');
    const open=!panel.hidden;
    panel.hidden=open;
    btn.setAttribute('aria-expanded',String(!open));
    btn.textContent=open?'View details':'Hide details';
  }));

  const search=document.getElementById('serviceSearch');
  const chips=document.querySelectorAll('[data-filter]');
  function filterServices(cat='all'){
    const q=(search?.value||'').toLowerCase();
    document.querySelectorAll('.service-card').forEach(card=>{
      const text=card.innerText.toLowerCase();
      const okQ=!q||text.includes(q);
      const okC=cat==='all'||card.dataset.category===cat;
      card.style.display=(okQ&&okC)?'':'none';
    });
  }
  if(search){search.addEventListener('input',()=>filterServices(document.querySelector('[data-filter].active')?.dataset.filter||'all'));}
  chips.forEach(ch=>ch.addEventListener('click',()=>{chips.forEach(c=>c.classList.remove('active'));ch.classList.add('active');filterServices(ch.dataset.filter);}));

  const form=document.getElementById('printRequestForm'); if(!form) return;
  let step=1; const max=4; const progress=document.querySelector('[data-progress]');
  const params=new URLSearchParams(location.search); const serviceParam=params.get('service');
  if(serviceParam){ const opt=[...form.service.options].find(o=>o.value.toLowerCase().replaceAll(' ','-').includes(serviceParam.split('-')[0])); if(opt) form.service.value=opt.value; }
  function summary(){
    const fd=new FormData(form); const finishes=fd.getAll('finish').join(', ')||'None selected';
    return `<strong>Service:</strong> ${fd.get('service')||'-'}<br><strong>Mode:</strong> ${fd.get('mode')||'-'}<br><strong>Size:</strong> ${fd.get('size')||'-'}<br><strong>Quantity:</strong> ${fd.get('quantity')||'-'}<br><strong>Media/GSM:</strong> ${fd.get('media')||'-'}<br><strong>File to attach on WhatsApp:</strong> ${fd.get('filetype')||'-'}<br><strong>Finish:</strong> ${finishes}<br><strong>Branch:</strong> ${fd.get('branch')||'-'}<br><strong>Need by:</strong> ${fd.get('deadline')||'-'}<br><strong>Notes:</strong> ${fd.get('notes')||'-'}`;
  }
  function setStep(n){
    step=Math.min(max,Math.max(1,n));
    document.querySelectorAll('.form-step').forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===step));
    document.querySelectorAll('[data-step-dot]').forEach(d=>d.classList.toggle('active',Number(d.dataset.stepDot)<=step));
    if(progress) progress.style.width=(step/max*100)+'%';
    const box=document.querySelector('[data-summary]'); if(box) box.innerHTML=summary();
  }
  form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>setStep(step+1)));
  form.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>setStep(step-1)));
  form.addEventListener('input',()=>{const box=document.querySelector('[data-summary]'); if(box) box.innerHTML=summary();});
  form.addEventListener('submit',e=>{
    e.preventDefault(); const fd=new FormData(form);
    const lines=['Hello Classic Business Centre, I want to place a print request.','',`Service: ${fd.get('service')||'-'}`,`Print mode: ${fd.get('mode')||'-'}`,`Size/format: ${fd.get('size')||'-'}`,`Quantity: ${fd.get('quantity')||'-'}`,`Paper/media/GSM: ${fd.get('media')||'-'}`,`File type I will attach here: ${fd.get('filetype')||'-'}`,`Finishing: ${fd.getAll('finish').join(', ')||'-'}`,`Preferred branch: ${fd.get('branch')||'-'}`,`Need by: ${fd.get('deadline')||'-'}`,`Notes: ${fd.get('notes')||'-'}`,'','I will attach the print file in this WhatsApp chat.'];
    window.open('https://wa.me/919422062887?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
  });
  setStep(1);
})();
