const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Handle form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint for notification sign-up
app.post('/api/notify', (req, res) => {
  const { email } = req.body;
  // In a real app, you would save this to a database
  console.log(`Notification request from: ${email}`);
  res.json({ success: true, message: 'Thank you! We will notify you when we launch.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 