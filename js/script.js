document.addEventListener('DOMContentLoaded',()=>{
  const ham=document.querySelector('.hamburger');
  const nav=document.querySelector('.nav-links');
  if(ham&&nav){ham.addEventListener('click',()=>nav.classList.toggle('active'))}
  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length>1){
        e.preventDefault();
        const el=document.querySelector(id);
        if(el) el.scrollIntoView({behavior:'smooth'});
        if(nav) nav.classList.remove('active');
      }
    })
  });
  // product images: if a photo file is missing, show a neat labelled placeholder instead of a broken icon
  document.querySelectorAll('.catalog-item img').forEach(img=>{
    const swap=()=>{
      if(img.dataset.failed) return;
      img.dataset.failed='1';
      const ph=document.createElement('div');
      ph.className='ph '+(img.dataset.fallback||'');
      ph.textContent=(img.alt||'Product')+' - photo coming soon';
      img.replaceWith(ph);
    };
    img.addEventListener('error',swap);
    if(img.complete && img.naturalWidth===0) swap();
  });
  // quote form
  const form=document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const msg=`Hello Rokim Kenya Ltd, I need a quote for ${data.get('service')} - ${data.get('details')}. My contact: ${data.get('phone')}`;
      window.open(`https://wa.me/254733505007?text=${encodeURIComponent(msg)}`,'_blank');
      form.reset();
      alert('Opening WhatsApp with your quote request!');
    })
  }
});
function downloadPlaceholder(name){
  alert(name + ' catalogue will be downloadable soon. Currently using All Things Metal catalogue as placeholder. Contact us on WhatsApp for full catalogue.');
}
