const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

// 设置路由
app.get('/api', authenticateToken, (req, res) => {
  // 这里可以编写获取API数据的代码
  const data = { message: '' };
  res.json(data);
});

// 用户登录路由
app.post('/login', (req, res) => {
  // 这里可以编写验证用户身份的代码
  // 如果验证通过，可以生成一个JWT令牌并返回给客户端
  const username = req.body.username;
  const user = { username: username };
  const token = jwt.sign(user, secretKey);
  res.json({ token: token });
});

// 验证JWT令牌的中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}`);
});