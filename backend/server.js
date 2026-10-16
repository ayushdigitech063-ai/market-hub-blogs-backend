const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const biographyRoutes = require('./routes/biographyRoutes');
const articleRoutes = require('./routes/articleRoutes');
const companyRoutes = require('./routes/companyRoutes');
const brandRoutes = require('./routes/brandRoutes');
const slidingCompanyRoutes = require('./routes/slidingcompanyRoutes');
const latestArticleRoutes = require('./routes/latestarticleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully to digitalMarketingDB!"))
  .catch((err) => console.log("Database connection error: ", err));


app.use('/api/blog-authors', require('./routes/blogAuthorRoutes'));
app.use('/api/blog-articles', require('./routes/blogArticleRoutes'));
app.use('/api/biographies', biographyRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/sliding-companies', slidingCompanyRoutes);
app.use('/api/latest-articles', latestArticleRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/', (req, res) => {
  res.json({ message: "Market Hub Blogs Backend is running successfully!" });
});
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});