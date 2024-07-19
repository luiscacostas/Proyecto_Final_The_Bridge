require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); 
const connectDB = require('./config/db_mongo');
const userRoutes = require('./routes/users.routes');
const tokenRoutes = require('./routes/tokens.routes');
const authRoutes = require('./routes/auth.routes');
const { verifyToken, isAdmin } = require('./config/jwt');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/tokens', verifyToken, tokenRoutes)

app.use(morgan(':method :host :status - :response-time ms :body'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('location', (data) => {
    console.log('Location data received:', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});


app.use('*',error404);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});