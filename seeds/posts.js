const mongoose = require('mongoose');
const Post = require('../models/posts');

mongoose.connect('mongodb://localhost:27017/whats-matter', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Post.deleteMany({})
    for(let i = 0; i < 10; i++){
    const post = new Post({
        title: 'Lorem Ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!'
    })
    await post.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})