var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    description: String
})

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;