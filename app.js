const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/supplementRoutes');
const contactRoutes =require('./routes/contact')
const userRoutes =require('./routes/admin')
const testimonialsRouter = require('./routes/Testimonial');
const socialMediaRouter =require('./routes/socialMedia')
const teamRoutes =require('./routes/groupMembers')
// Or, if you want to allow requests from specific origins
const path = require('path');


const app = express();

// Middleware
// Enable CORS for all routes
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/testimonials', testimonialsRouter);
app.use('/social-media', socialMediaRouter);
app.use('/team-members', teamRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://nutrivanutriva55:emgVsa1G2AIjDn83@cluster0.n7p5dyd.mongodb.net/', {
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









