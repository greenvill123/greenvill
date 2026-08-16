/* Greenvill CRM — Auth & Session */
const SESSION_KEY = 'greenvill_crm_session';

const Session = {
  set(user){
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, at: Date.now() }));
  },
  get(){
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  token(){
    const s = this.get();
    return s ? btoa(`${s.username}:${s.at}`) : null;
  },
  clear(){
    sessionStorage.removeItem(SESSION_KEY);
  },
  role(){
    return (this.get()?.role || '').toLowerCase();
  },
  can(action){
    const role = this.role();
    const perms = {
      admin:   ['view','add','edit','delete','approve','reports','settings'],
      manager: ['view','add','edit','approve','reports'],
      agent:   ['view','add','edit'],
    };
    return (perms[role] || []).includes(action);
  },
};

const Auth = {
  async login(username, password){
    try {
      const res = await Api.request('/login', { username, password });
      if(res && res.ok) Session.set(res.user);
      return res;
    } catch(err) {
      return { ok: false, error: err.message || 'Unable to connect to backend server' };
    }
  },
  logout(){
    const s = Session.get();
    if(s) Store.log?.(s.username, 'Logged out');
    Session.clear();
    const isPages = window.location.pathname.includes('/pages/');
    window.location.href = isPages ? '../index.html' : 'index.html';
  },
  guard(){
    if(!Session.get()){
      const isPages = window.location.pathname.includes('/pages/');
      window.location.href = isPages ? '../index.html' : 'index.html';
    }
  },
};
