// search.js
export function compileRegex(input, flags=''){
  if (!input) return null;
  try { return new RegExp(input, flags); } catch { return null; }
}
export function highlight(text, re){
  if (!re) return escapeHtml(text);
  const esc = escapeHtml(text);
  return esc.replace(re, m => `<mark>${m}</mark>`);
}
function escapeHtml(s){ return String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }
