require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors({
	origin: 'https://taskman-garud-nextjs.netlify.app',
	credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));