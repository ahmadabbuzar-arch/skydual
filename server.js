const express = require('express'), http = require('http'), { Server } = require('socket.io');
const app = express(), srv = http.createServer(app), io = new Server(srv, { cors: { origin: '*' } });
app.use(express.static(__dirname));
const rooms = {}, MAX = 8;
io.on('connection', s => {
  s.on('join', ({ room, name }, ack) => {
    room = String(room || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!room) {   // no code: put player in the first public lobby with space, else open a new one
      room = Object.keys(rooms).find(k => k.startsWith('PUB') && Object.keys(rooms[k]).length < MAX)
          || 'PUB' + Math.random().toString(36).slice(2, 7).toUpperCase();
    }
    const r = rooms[room] ??= {};
    if (Object.keys(r).length >= MAX) return ack({ error: 'Room full' });
    name = String(name || 'Pilot').slice(0, 16);
    if (Object.values(r).some(p => p.name === name)) name += Math.floor(Math.random() * 90 + 10);
    s.room = room; s.pname = name;
    const a = Math.random() * 6.28, spawn = { p: [Math.cos(a) * 400, 600, Math.sin(a) * 400], yaw: Math.random() * 6.28 };
    const players = Object.entries(r).map(([id, p]) => ({ id, ...p }));
    r[s.id] = { name, p: spawn.p, q: [0, 0, 0, 1], v: [0, 0, 0] };
    s.join(room); s.to(room).emit('joined', { id: s.id, name });
    ack({ name, room, players, spawn });
  });
  s.on('state', d => { const r = rooms[s.room]; if (!r || !r[s.id]) return; Object.assign(r[s.id], d); s.to(s.room).emit('state', { id: s.id, ...d }); });
  s.on('ev', d => { if (d && typeof d.t === 'string' && s.room) s.to(s.room).emit('ev', { ...d, id: s.id }); });   // fire / missile / death events
  s.on('disconnect', () => { const r = rooms[s.room]; if (!r) return; delete r[s.id]; io.to(s.room).emit('left', { id: s.id, name: s.pname }); if (!Object.keys(r).length) delete rooms[s.room]; });
});
const PORT = process.env.PORT || 3000;
srv.listen(PORT, '0.0.0.0', () => console.log('SkyDuel server chal raha hai: http://localhost:' + PORT));
