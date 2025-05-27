const pool = require('../config/db');

exports.getAllRoutes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Fares');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
