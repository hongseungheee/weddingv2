const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 'public' 경로를 제거하고 현재 폴더 자체를 정적 폴더로 지정
app.use(express.static(__dirname));

// 루트 접속 시 현재 폴더의 index.html을 보냄
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`서버 구동 완료: http://localhost:${PORT}`);
});