const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 自动创建data目录和空JSON文件
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'contacts.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 读取通讯录（每次实时从文件读取）
function getContacts() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取文件失败:', error);
    return [];
  }
}

// 保存通讯录（覆盖写入文件）
function saveContacts(contacts) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('写入文件失败:', error);
  }
}


// API端点
app.get('/api/contacts', (req, res) => {
  const contacts = getContacts();
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const contacts = getContacts();
  const newContact = { 
    id: Date.now().toString(),
    ...req.body
  };
  contacts.push(newContact);
  saveContacts(contacts);
  res.status(201).json(newContact);
});

app.delete('/api/contacts/:id', (req, res) => {
  let contacts = getContacts();
  contacts = contacts.filter(c => c.id !== req.params.id);
  saveContacts(contacts);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`--------------------------------------`);
  console.log(`后端API服务已启动，端口: ${port}`);
  console.log(`前端页面访问地址:`);
  console.log(`http://localhost:${port}`); // Express静态资源托管自动指向public目录
  console.log(`--------------------------------------`);
});
