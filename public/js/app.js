// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('contact-list');
  const form = document.getElementById('add-form');

  let errEl = document.createElement('div');
  errEl.className = 'error-message';
  errEl.id = 'form-error';
  form.insertAdjacentElement('afterend', errEl);

  function showError(msg) {
    errEl.textContent = msg;
    errEl.classList.add('visible');
    setTimeout(() => errEl.classList.remove('visible'), 5000);
  }
  function clearError() {
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }

  // 使用 localStorage 模拟后端存储
  function getContacts() {
    try {
      const contacts = localStorage.getItem('contacts');
      return contacts ? JSON.parse(contacts) : [];
    } catch (e) {
      console.error('读取联系人失败:', e);
      return [];
    }
  }

  function saveContacts(contacts) {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (e) {
      console.error('保存联系人失败:', e);
    }
  }

  function escapeHtml(s){ 
    return String(s||'').replace(/[&<>"']/g, (m)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); 
  }

  function renderTable(contacts) {
    if (!contacts || contacts.length === 0) {
      listEl.innerHTML = `<div class="empty">No contact person for the moment.</div>`;
      return;
    }
    const rows = contacts.map(c => `
      <tr data-id="${c.id}">
        <td>
          <div class="name-cell">
            <div class="avatar">${escapeHtml((c.name||'').trim().charAt(0).toUpperCase() || '?')}</div>
            <div>
              <div style="font-weight:600">${escapeHtml(c.name)}</div>
              <div style="color:var(--muted);font-size:0.85rem">${escapeHtml(c.phone)}</div>
            </div>
          </div>
        </td>
        <td>${escapeHtml(c.phone)}</td>
        <td style="width:120px">
          <button class="btn delete" data-id="${c.id}">Delete</button>
        </td>
      </tr>`).join('');

    listEl.innerHTML = `
      <table class="contact-table" aria-label="通讯录表格">
        <thead>
          <tr><th>name</th><th>phone</th><th>operation</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
    attachDeleteHandlers();
  }

  function attachDeleteHandlers() {
    listEl.querySelectorAll('button.delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (!confirm('Are you sure you want to delete this contact?')) return;
        
        try {
          const contacts = getContacts();
          const updatedContacts = contacts.filter(c => c.id !== id);
          saveContacts(updatedContacts);
          await refresh();
        } catch (err) {
          showError('fail to delete：' + err.message);
        }
      });
    });
  }

  async function refresh() {
    clearError();
    const contacts = getContacts();
    renderTable(contacts);
  }

  function validatePhone(phone){
    const digits = (phone||'').replace(/\D/g,'');
    if (digits.length < 3) return { ok:false, msg:'The phone number must consist of at least 3 digits.' };
    return { ok:true };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();
    const fd = new FormData(form);
    const name = (fd.get('name')||'').trim();
    const phone = (fd.get('phone')||'').trim();
    
    if (!name) { showError('Please fill in your name.'); return; }
    const chk = validatePhone(phone);
    if (!chk.ok) { showError(chk.msg); return; }

    try {
      const contacts = getContacts();
      const newContact = { 
        id: Date.now().toString(),
        name,
        phone
      };
      contacts.push(newContact);
      saveContacts(contacts);
      
      form.reset();
      await refresh();
    } catch (err) {
      showError('fail to add：' + err.message);
    }
  });

  // 初次加载时，如果有示例数据，可以初始化
  function initSampleData() {
    const contacts = getContacts();
    if (contacts.length === 0) {
      // 可以在这里添加一些示例数据，或者保持空数组
      const sampleContact = {
        id: Date.now().toString(),
        name: "momo",
        phone: "12345678909"
      };
      contacts.push(sampleContact);
      saveContacts(contacts);
    }
  }

  // 初次加载
  initSampleData();
  refresh();
});