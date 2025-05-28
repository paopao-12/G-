const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const fareRoutes = require('./routes/fareRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', fareRoutes);

app.get('/', (req, res) => res.send('G! backend is running'));

// Listen on all network interfaces to allow LAN access
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
