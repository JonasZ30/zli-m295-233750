const express = require('express')
const app = express()
const port = 3700

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let books = [
    {
      isbn: "978-0-385-48643-9",
      title: "To Kill a Mockingbird",
      year: "1960",
      author: "Harper Lee",
    },
    {
      isbn: "978-0-307-94877-4",
      title: "The Great Gatsby",
      year: "1925",
      author: "F. Scott Fitzgerald",
    },
    {
      isbn: "978-1-250-02332-6",
      title: "1984",
      year: "1949",
      author: "George Orwell",
    },
    {
      isbn: "978-0-06-112008-4",
      title: "The Catcher in the Rye",
      year: "1951",
      author: "J.D. Salinger",
    },
    {
      isbn: "978-0-618-34694-7",
      title: "To Kill a Mockingbird",
      year: "1997",
      author: "J.K. Rowling",
    },
    {
      isbn: "978-0-7432-2672-0",
      title: "The Da Vinci Code",
      year: "2003",
      author: "Dan Brown",
    },
    {
      isbn: "978-1-101-15381-5",
      title: "The Hobbit",
      year: "1937",
      author: "J.R.R. Tolkien",
    },
    {
      isbn: "978-0-06-112241-5",
      title: "Lord of the Flies",
      year: "1954",
      author: "William Golding",
    },
    {
      isbn: "978-1-4169-1800-5",
      title: "The Hunger Games",
      year: "2008",
      author: "Suzanne Collins",
    },
    {
      isbn: "978-0-307-70141-8",
      title: "The Road",
      year: "2006",
      author: "Cormac McCarthy",
    },
  ];
  

app.get('/books', (request, response) => {
    response.send(books);
});
  

app.post("/books", (req, res) => {
    console.log(req.body);
    books.push(req.body);
    console.log(books);
    res.status(201).send(books);
});



app.get("/books/:isbn", (request, response) => {
    const book = books.find(book => book.isbn === request.params.isbn);
    if (book) {
        response.send(book);
    }
});

app.put('/books/:isbn', (request, response) => {
  const book = books.map(book => book.isbn === request.params.isbn ? request.body : book);
  if (book){
    response.send(book)
  }
});

app.delete('/books/:isbn', (request, response) => {
  const book = books.filter(book => book.isbn != request.params.isbn);
  response.send(book)
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
