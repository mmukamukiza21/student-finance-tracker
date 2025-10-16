// storage.js
export const KEY = 'sft:data';
export function load(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ console.error('load',e); return null; }
}
export function save(data){
  try{ localStorage.setItem(KEY, JSON.stringify(data)); return true; }catch(e){ console.error('save',e); return false; }
}
