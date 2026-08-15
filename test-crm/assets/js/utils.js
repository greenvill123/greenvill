/* Greenvill CRM — Utilities */

const Utils = {
  id(prefix){
    const rand = Math.random().toString(36).slice(2,7).toUpperCase();
    const ts = Date.now().toString().slice(-5);
    return `${prefix}-${ts}${rand}`;
  },

  money(n){
    n = Number(n) || 0;
    return new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n);
  },

  numberIN(n){
    return new Intl.NumberFormat('en-IN').format(Number(n)||0);
  },

  dateShort(d){
    if(!d) return '—';
    const dt = new Date(d);
    if(isNaN(dt)) return d;
    return dt.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  },

  todayISO(){
    return new Date().toISOString().slice(0,10);
  },

  daysBetween(a,b){
    const A = new Date(a), B = new Date(b);
    return Math.round((B-A)/(1000*60*60*24));
  },

  initials(name){
    if(!name) return '?';
    return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]?.toUpperCase()).join('');
  },

  escapeHtml(str){
    return String(str ?? '').replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[s]));
  },

  async sha256(text){
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
  },

  toast(message, type='ok'){
    let stack = document.querySelector('.toast-stack');
    if(!stack){
      stack = document.createElement('div');
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }
    const el = document.createElement('div');
    el.className = `toast ${type==='error'?'error':''}`;
    el.innerHTML = `<span>${Utils.escapeHtml(message)}</span>`;
    stack.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .25s'; setTimeout(()=>el.remove(),250); }, 2600);
  },

  csvDownload(filename, rows){
    if(!rows.length) return Utils.toast('Nothing to export', 'error');
    const headers = Object.keys(rows[0]);
    const esc = v => `"${String(v ?? '').replace(/"/g,'""')}"`;
    const lines = [headers.join(','), ...rows.map(r => headers.map(h=>esc(r[h])).join(','))];
    const blob = new Blob([lines.join('\n')], { type:'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  debounce(fn, ms=250){
    let t;
    return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
  },

  qs(sel, root=document){ return root.querySelector(sel); },
  qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); },
};
