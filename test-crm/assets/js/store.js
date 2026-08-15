/**
 * Greenvill CRM — Mock Data Store
 * Stands in for the Google Sheets database (Sheet1..Sheet7 in the PRD) while
 * MODE = "mock". Same table names/columns, so swapping to real Google Sheets
 * via Apps Script later is a drop-in change in api.js, not a rewrite here.
 */
const DB_KEY = 'greenvill_crm_db_v1';

const Store = {
  _read(){
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  _write(db){
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  },

  seed(){
    if(this._read()) return;
    const now = Utils.todayISO();

    const db = {
      Users: [
        { UserID:'U-ADMIN', Username:'admin', PasswordHash:null, Password:'admin123', Role:'admin', Name:'Govindhasamy K', Status:'Active', LastLogin:null },
        { UserID:'U-MGR', Username:'manager', PasswordHash:null, Password:'manager123', Role:'manager', Name:'Priya R', Status:'Active', LastLogin:null },
        { UserID:'U-AGT', Username:'agent', PasswordHash:null, Password:'agent123', Role:'agent', Name:'Suresh M', Status:'Active', LastLogin:null },
      ],
      Banks: [
        { BankID:'BNK-001', BankName:'State Bank of India', Branch:'Trichy Main', ManagerName:'R. Kannan', Phone:'9840012345', Email:'sbi.trichy@bank.in', Commission:2.0, Status:'Active' },
        { BankID:'BNK-002', BankName:'HDFC Bank', Branch:'Cantonment', ManagerName:'A. Meena', Phone:'9840023456', Email:'hdfc.trichy@bank.in', Commission:2.5, Status:'Active' },
        { BankID:'BNK-003', BankName:'Indian Bank', Branch:'Srirangam', ManagerName:'V. Raja', Phone:'9840034567', Email:'ib.srirangam@bank.in', Commission:1.8, Status:'Active' },
        { BankID:'BNK-004', BankName:'ICICI Bank', Branch:'Thillai Nagar', ManagerName:'S. Devi', Phone:'9840045678', Email:'icici.trichy@bank.in', Commission:2.2, Status:'Active' },
      ],
      Customers: [
        { CustomerID:'CUS-1001', Name:'Karthik Subramaniam', FatherName:'Subramaniam R', Mobile:'9843211111', AltMobile:'', Email:'karthik.s@example.com', Address:'Thillai Nagar, Trichy', Occupation:'Business Owner', Income:65000, PAN:'ABCDE1234F', Aadhaar:'XXXX-XXXX-1234', DOB:'1988-04-12', Status:'Active', CreatedDate:now },
        { CustomerID:'CUS-1002', Name:'Lakshmi Narayanan', FatherName:'Narayanan K', Mobile:'9843222222', AltMobile:'9843200000', Email:'lakshmi.n@example.com', Address:'Srirangam, Trichy', Occupation:'Govt Employee', Income:48000, PAN:'BCDEF2345G', Aadhaar:'XXXX-XXXX-2345', DOB:'1990-09-02', Status:'Active', CreatedDate:now },
        { CustomerID:'CUS-1003', Name:'Mohammed Irfan', FatherName:'Abdul Kareem', Mobile:'9843233333', AltMobile:'', Email:'irfan.m@example.com', Address:'Cantonment, Trichy', Occupation:'Shop Owner', Income:55000, PAN:'CDEFG3456H', Aadhaar:'XXXX-XXXX-3456', DOB:'1985-01-20', Status:'Active', CreatedDate:now },
        { CustomerID:'CUS-1004', Name:'Divya Bharathi', FatherName:'Bharathi S', Mobile:'9843244444', AltMobile:'', Email:'divya.b@example.com', Address:'K.K. Nagar, Trichy', Occupation:'Teacher', Income:38000, PAN:'DEFGH4567I', Aadhaar:'XXXX-XXXX-4567', DOB:'1993-11-15', Status:'Pending', CreatedDate:now },
      ],
      Loans: [
        { LoanID:'LN-5001', CustomerID:'CUS-1001', LoanType:'Business Loan', LoanAmount:1200000, BankID:'BNK-001', Interest:11.5, Tenure:60, Stage:'Disbursed', Status:'Approved', AssignedAgent:'Suresh M', CreatedDate:now },
        { LoanID:'LN-5002', CustomerID:'CUS-1002', LoanType:'Home Loan', LoanAmount:2800000, BankID:'BNK-002', Interest:8.7, Tenure:180, Stage:'Bank Processing', Status:'Pending', AssignedAgent:'Suresh M', CreatedDate:now },
        { LoanID:'LN-5003', CustomerID:'CUS-1003', LoanType:'Personal Loan', LoanAmount:450000, BankID:'BNK-003', Interest:13.2, Tenure:36, Stage:'Document Verification', Status:'Pending', AssignedAgent:'Priya R', CreatedDate:now },
        { LoanID:'LN-5004', CustomerID:'CUS-1004', LoanType:'Education Loan', LoanAmount:800000, BankID:'BNK-004', Interest:9.9, Tenure:84, Stage:'Rejected by Bank', Status:'Rejected', AssignedAgent:'Priya R', CreatedDate:now },
      ],
      FollowUps: [
        { FollowupID:'FU-9001', CustomerID:'CUS-1002', Remarks:'Awaiting salary slip, promised by evening', NextDate:now, Status:'Pending', Agent:'Suresh M' },
        { FollowupID:'FU-9002', CustomerID:'CUS-1003', Remarks:'Sent for document verification at branch', NextDate:now, Status:'Pending', Agent:'Priya R' },
      ],
      ActivityLog: [],
      Settings: {
        companyName:'Greenvill Associates', theme:'green', backupEnabled:true,
        loanTypes:['Business Loan','Home Loan','Personal Loan','Education Loan','Gold Loan','Vehicle Loan'],
      },
    };
    this._write(db);
  },

  get(table){
    const db = this._read() || {};
    return db[table] || [];
  },
  getSettings(){
    const db = this._read() || {};
    return db.Settings || {};
  },
  setSettings(patch){
    const db = this._read();
    db.Settings = { ...db.Settings, ...patch };
    this._write(db);
  },
  insert(table, row){
    const db = this._read();
    db[table] = db[table] || [];
    db[table].push(row);
    this._write(db);
    return row;
  },
  update(table, idField, id, patch){
    const db = this._read();
    const list = db[table] || [];
    const idx = list.findIndex(r => r[idField] === id);
    if(idx === -1) return null;
    list[idx] = { ...list[idx], ...patch };
    this._write(db);
    return list[idx];
  },
  remove(table, idField, id){
    const db = this._read();
    db[table] = (db[table]||[]).filter(r => r[idField] !== id);
    this._write(db);
  },
  log(user, action){
    const db = this._read();
    db.ActivityLog = db.ActivityLog || [];
    db.ActivityLog.unshift({ LogID:Utils.id('LOG'), User:user, Action:action, Timestamp:new Date().toISOString() });
    db.ActivityLog = db.ActivityLog.slice(0, 200);
    this._write(db);
  },
  resetAll(){
    localStorage.removeItem(DB_KEY);
    this.seed();
  },
};
