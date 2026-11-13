'use strict';
const loanData = {
 home: { title: 'Your own front door.', copy: 'Buying your first home or planning a new one? Get guidance on housing loan options, eligibility and the documents you’ll need.', tags: ['Home purchase', 'Home construction', 'Balance transfer'], image: 'assets/loan-home.webp', action: 'Talk about a home loan', page: 'loan-home.html', pageLabel: 'Learn more' },
 personal: { title: 'For what matters now.', copy: 'For a family milestone, education, a medical need or another personal expense. Explore personal loan options with guidance from our local team.', tags: ['Personal expenses', 'Family needs', 'Application guidance'], image: 'assets/loan-personal.webp', action: 'Talk about a personal loan', page: 'loan-personal.html', pageLabel: 'Learn more' },
 business: { title: 'Give your ambition room.', copy: 'Working capital, new equipment or the next stage of your business. We help you explore business loan options and prepare for lender requirements.', tags: ['Working capital', 'Business expansion', 'Equipment'], image: 'assets/loan-business.webp', action: 'Talk about a business loan', page: 'loan-business.html', pageLabel: 'Learn more' },
 property: { title: 'Build on what you own.', copy: 'Explore loans against property and mortgage options for your needs. We guide you through the application requirements, with valuation and approval handled by the lender.', tags: ['Loan against property', 'Mortgage assistance', 'Documentation'], image: 'assets/loan-property.webp', action: 'Talk about a property loan', page: 'loan-property.html', pageLabel: 'Learn more' },
 other: { title: 'There’s more we can help with.', copy: 'From a vehicle or further education to a gold loan or transferring an existing balance, speak with us about the options available for your situation.', tags: ['Vehicle loans', 'Education loans', 'Gold loans', 'Balance transfers'], image: 'assets/loan-other.webp', action: 'Discuss your loan requirement', page: 'loan-other.html', pageLabel: 'Learn more' }
};
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ menuButton.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); menuButton.querySelector('span').textContent='+'; }
menuButton.addEventListener('click',()=>{ const open=menuButton.getAttribute('aria-expanded')!=='true'; menuButton.setAttribute('aria-expanded',String(open)); navigation.classList.toggle('open',open); menuButton.querySelector('span').textContent=open?'−':'+'; });
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus()}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu()});
const loanButtons=[...document.querySelectorAll('[data-loan]')];
loanButtons.forEach(button=>button.addEventListener('click',()=>{
 const data=loanData[button.dataset.loan];
 loanButtons.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
 document.querySelector('#loan-title').textContent=data.title;
 document.querySelector('#loan-copy').textContent=data.copy;
 const tags=document.querySelector('#loan-tags'); tags.replaceChildren(...data.tags.map(text=>{const span=document.createElement('span');span.textContent=text;return span}));
 const image=document.querySelector('#loan-image');
 image.classList.remove('loaded');
 void image.offsetWidth;
 image.src=data.image;
 if(image.decode){image.decode().then(()=>image.classList.add('loaded')).catch(()=>image.classList.add('loaded'));}
 else{image.classList.add('loaded');}
 const action=document.querySelector('#loan-action');action.textContent=data.action+' ↗';
 const pageLink=document.querySelector('#loan-page-link');if(pageLink){pageLink.href=data.page;pageLink.innerHTML=data.pageLabel+' <span aria-hidden="true">↗</span>';}
 const detail=document.querySelector('.loan-detail');detail.classList.remove('changing');void detail.offsetWidth;detail.classList.add('changing');
}));
function calculateEMI(principal,annualRate,years){const months=years*12,rate=annualRate/1200;const emi=rate===0?principal/months:principal*rate/(1-Math.pow(1+rate,-months));return {emi,total:emi*months,interest:emi*months-principal};}
const currency=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
function updateCalculator(){
 const amount=Number(document.querySelector('#amount').value), interest=Number(document.querySelector('#interest').value), tenure=Number(document.querySelector('#tenure').value);
 const result=calculateEMI(amount,interest,tenure);
 document.querySelector('#amount-output').textContent=currency(amount);
 document.querySelector('#interest-output').textContent=interest+'%';
 document.querySelector('#tenure-output').textContent=tenure+(tenure===1?' year':' years');
 document.querySelector('#emi-output').textContent=currency(result.emi);
 document.querySelector('#principal-output').textContent=currency(amount);
 document.querySelector('#total-interest').textContent=currency(result.interest);
 document.querySelector('#total-output').textContent=currency(result.total);
 const circumference=2*Math.PI*35;document.querySelector('#principal-ring').setAttribute('stroke-dasharray',`${amount/result.total*circumference} ${circumference}`);
 document.querySelector('.emi-chart').setAttribute('aria-label',`Principal ${currency(amount)}; total interest ${currency(result.interest)}`);
 document.querySelector('#amount').setAttribute('aria-valuetext',currency(amount));document.querySelector('#interest').setAttribute('aria-valuetext',interest+' percent per year');document.querySelector('#tenure').setAttribute('aria-valuetext',tenure+' years');
}
const calculatorInputs=['amount','interest','tenure'];
if(calculatorInputs.every(id=>document.getElementById(id))){calculatorInputs.forEach(id=>document.getElementById(id).addEventListener('input',updateCalculator));updateCalculator();}
document.querySelector('#year').textContent=new Date().getFullYear();
Object.values(loanData).forEach(item=>{const preload=new Image();preload.src=item.image;});
const contactVideo=document.querySelector('.contact-video');
if(contactVideo){
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){contactVideo.removeAttribute('autoplay');contactVideo.pause();}
 else{
  const playVideo=()=>{contactVideo.play().catch(()=>{})};
  playVideo();
  new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)playVideo()})},{threshold:.15}).observe(contactVideo);
 }
}
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealing');observer.unobserve(entry.target)}})},{threshold:.12});
 document.querySelectorAll('.section-heading h2,.section-heading p,.loan-option,.loan-detail,.loan-facts article,.loan-siblings,.loan-info-grid>div,.loan-panel,.calculator-intro h2,.calculator-intro p,.calculator,.construction-copy h2,.construction-copy p,.construction-copy li,.blueprint,.process-grid article,.faq-grid h2,.faq-list details,.contact-top h2,.contact-details>div,.loan-menu,.bank-inner,.service-note,.footer-top,.footer-bottom').forEach((element,index)=>{element.style.animationDelay=`${index%4*55}ms`;observer.observe(element)});
}
