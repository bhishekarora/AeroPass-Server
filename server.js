// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const enrollmentRoutes = require('./routes/enrollment');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', enrollmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
