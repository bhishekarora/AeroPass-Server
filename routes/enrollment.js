// routes/enrollment.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST endpoint to create a new enrollment
router.post('/enroll', (req, res) => {
    const { pnr, facialdata } = req.body;

    const sql = 'INSERT INTO enrollments (pnr, facialdata) VALUES (?, ?)';
    console.log(pnr,facialdata);
    db.query(sql, [pnr, facialdata], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: result.insertId, pnr, facialdata });
    });
});

router.get('/facialdata/:pnr', (req, res) => {
    const { pnr } = req.params;

    const sql = 'SELECT facialdata FROM enrollments WHERE pnr = ?';
    db.query(sql, [pnr], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            res.json({ facialdata: results[0].facialdata });
        } else {
            res.status(404).json({ error: 'PNR not found' });
        }
    });
});


// GET endpoint to fetch enrollments
router.get('/enrollments', (req, res) => {
    db.query('SELECT * FROM enrollments', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;
