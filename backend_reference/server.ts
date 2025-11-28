
/**
 * BACKEND REFERENCE CODE
 * This is a reference implementation for the Node.js backend.
 * In this demo, the frontend mocks these calls or uses Gemini directly.
 * 
 * Setup:
 * 1. npm init -y
 * 2. npm install express cors dotenv firebase-admin axios socket.io http
 * 3. tsc --init
 */

/*
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import * as admin from 'firebase-admin';
import axios from 'axios';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Configure appropriately for production
});

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
// const serviceAccount = require('./serviceAccountKey.json');
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// const db = admin.firestore();

// 1. Symptom Checker Proxy (Infermedica)
app.post('/api/symptom-checker', async (req, res) => {
  const { text, age, sex } = req.body;
  const INFERMEDICA_ID = process.env.INFERMEDICA_APP_ID;
  const INFERMEDICA_KEY = process.env.INFERMEDICA_APP_KEY;

  if (!INFERMEDICA_ID || !INFERMEDICA_KEY) {
     return res.status(503).json({ error: 'API Keys not configured' });
  }

  try {
    const response = await axios.post('https://api.infermedica.com/v3/parse', 
      { text, age: { value: age, unit: 'year' }, sex }, 
      { 
        headers: { 
          'App-Id': INFERMEDICA_ID, 
          'App-Key': INFERMEDICA_KEY,
          'Content-Type': 'application/json' 
        } 
      }
    );
    
    // In a real flow, you would chain /parse -> /diagnosis to get probabilities.
    // For simplicity, we just return the parse result or a simplified structure.
    res.json({
      conditions: response.data.mentions, 
      triage: { triage_level: 'consultation', serious: [] } // Mock triage for demo
    });
  } catch (e) {
    res.status(500).json({ error: 'Infermedica API Error' });
  }
});

// 2. Real-time Chat (Socket.io)
io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', async (data) => {
    const { roomId, senderId, text } = data;
    const message = {
        id: Date.now().toString(),
        senderId,
        text,
        timestamp: Date.now(),
        status: 'sent'
    };

    // Save to Firestore
    // await db.collection('consultations').doc(roomId).collection('messages').add(message);

    // Broadcast to room (including sender for simplicity, or exclude sender)
    io.to(roomId).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
*/
