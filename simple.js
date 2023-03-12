require('dotenv').config();
require('./config/database');

const Book = require('./models/book');
const User = require('./models/user');

async function createUser() {
    const user = new User({ name: 'Ida', email: 'didadeeee@gmail.com', password: 'lalala' });
    try {
    await user.save();
    console.log('test');
    console.log(user);
    } catch (err) {
    console.log('error');
    }
    }

async function createBook(){
    const book = new Book({ bookTitle: 'Atomic Habits', quote: 'test'});
    try {
    await book.save();
    console.log(book);
    } catch (err) {
    console.log('error');
    }
}

    async function createThought (){
        const book = new Book ({ thought: 'bla bla bla'});
        try {
        await book.save();
        console.log(book);
        } catch (err) {
        console.log('error');
        }
        }
    

createUser();
