const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

// 参与者信息
let participants = [
    { name: 'User1', avatar: '/u1.jpg', time: 'You have not participated yet.' }
    //{ name: 'Dawn2 WHC', avatar: '/avatar.jpg', time: '3 hours ago' },
    //{ name: 'Dawn3 WHC', avatar: '/avatar.jpg', time: '3 hours ago' }
];

let participantsEvent2 = [
    { name: 'User2', avatar: '/u2.jpg', time: 'You have not participated yet.' }
];

let participantsEvent3 = [
    { name: 'User3', avatar: '/u3.jpg', time: 'You have not participated yet.' }
    //{ name: 'Dawn2 WHC', avatar: '/avatar.jpg', time: '3 hours ago' },
    //{ name: 'Dawn3 WHC', avatar: '/avatar.jpg', time: '3 hours ago' }
];
// 允许跨域请求
app.use(cors());
app.use(express.json());

// 获取参与者信息
app.get('/participants', (req, res) => {
    res.json(participants);
});

// 获取 event2 特定参与者的信息
app.get('/participants/event2', (req, res) => {
    res.json(participantsEvent2);
});

app.get('/participants/event3', (req, res) => {
    res.json(participantsEvent3);
});
// 更新 event2 参与者的时间
app.post('/update-participants/event2', (req, res) => {
    const { updatedParticipants } = req.body;
    participantsEvent2 = updatedParticipants; // 更新后端存储的参与者信息
    res.json({ success: true, participantsEvent2 });
});

app.post('/update-participants/event3', (req, res) => {
    const { updatedParticipants } = req.body;
    participantsEvent3 = updatedParticipants; // 更新后端存储的参与者信息
    res.json({ success: true, participantsEvent3 });
});

// 更新参与者的时间
app.post('/update-participants', (req, res) => {
    const { updatedParticipants } = req.body;
    participants = updatedParticipants; // 更新后端存储的参与者信息
    res.json({ success: true, participants });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
