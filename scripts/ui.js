// ui.js
import { compileRegex, highlight } from './search.js';
import { all } from './state.js';

export function $(sel, ctx=document){ return ctx.querySelector(sel); }
export function $a(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

export function renderList(pattern, caseInsensitive=true){
  const re = compileRegex(pattern, pattern ? (caseInsensitive ? 'i' : '') : '');
  const tbody = $('#records');
  tbody.innerHTML = '';
  all().forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${highlight(String(r.amount), re)}</td>
      <td>${highlight(r.description, re)}</td>
      <td>${highlight(r.category, re)}</td>
      <td>${highlight(r.date, re)}</td>
      <td>
        <button class="edit" data-id="${r.id}">Edit</button>
        <button class="del" data-id="${r.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
