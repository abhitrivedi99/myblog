const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('./models/postModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//mongoose
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to DB!'));

// READ JSON FILE
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Post.create(posts);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
