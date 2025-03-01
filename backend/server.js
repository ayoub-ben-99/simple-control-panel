const express = require('express')
const cors= require('cors')
const dotenv = require('dotenv')
const db = require('./config/db.js')
const userRoutes = require('./routes/usersRoute.js')
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/users", userRoutes);

// MongoDB
db

// start server API
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port https://localhost:${PORT}`));
