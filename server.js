require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); 
const connectDB = require('./config/db_mongo');
const userRoutes = require('./routes/users.routes');
const tokenRoutes = require('./routes/tokens.routes');
const authRoutes = require('./routes/auth.routes');
const routeRoutes = require('./routes/routes.routes')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://proyecto-final-the-bridge-1.onrender.com/", 
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: "https://proyecto-final-the-bridge-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes)
app.use('/api/routes', routeRoutes)

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('*',error404);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});