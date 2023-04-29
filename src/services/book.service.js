const express = require('express')
const router = express.Router()

const defaultPath = '/books';
router.use(express.urlencoded());
router.use(express.json());

let bookstore = {
    books: [
        {id: 1, title: 'teste', author: 'testador'}
    ]
};

router.get(defaultPath, (req, res) => {
    res.json(bookstore);
});

router.get(`${defaultPath}/:id`, (req, res) => {
    const book = bookstore.books.find(item => item.id == req.params.id);
    if (!!book) {
        res.json(book);
    }
    res.send({
        message: 'Book not found!'
    });
});

router.post(defaultPath, (req, res) => {
    req.body.id = bookstore.books.length + 1;
    bookstore.books.push(req.body);
    res.send({
        message: 'New book successfully registered',
        value: req.body
    });
});

router.put(`${defaultPath}/:id`, (req, res) => {
    let isExistBook = false;
    bookstore.books = bookstore.books.map(item => {
        if (item.id === req.body.id) {
            item = req.body
            isExistBook = true;
        }
        return item;
    });

    if (!isExistBook) {
        res.send({
            message: 'Book not found!'
        });
    }
    res.send({
        message: 'The book has been updated successfully',
        value: req.body
    });
});

router.delete(`${defaultPath}/:id`, (req, res) => {
    bookstore.books = bookstore.books.filter(item => item.id != req.params.id);
    res.send({
        message: 'Deletion performed successfully',
        value: bookstore?.books || []
    });
});

module.exports = router;
