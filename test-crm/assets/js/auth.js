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
    const res = await Api.request('/login', { username, password });
    if(res.ok) Session.set(res.user);
    return res;
  },
  logout(){
    const s = Session.get();
    if(s) Store.log?.(s.username, 'Logged out');
    Session.clear();
    window.location.href = '/index.html';
  },
  guard(){
    if(!Session.get()){
      window.location.href = '/index.html';
    }
  },
};
