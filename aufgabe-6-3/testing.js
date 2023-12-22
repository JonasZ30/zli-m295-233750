const express = require('express')
const { randomUUID } = require('node:crypto');
const app = express()
const port = 3850

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*

Aufgabe 4.2 Bibliothek API umsetzen

*/
let books = [
    {
      "id": "1",
      "isbn": "978-0-385-48643-9",
      "title": "To Kill a Mockingbird",
      "year": "1960",
      "author": "Harper Lee"
    },
    {
      "id": "2",
      "isbn": "978-0-307-94877-4",
      "title": "The Great Gatsby",
      "year": "1925",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": "3",
      "isbn": "978-1-250-02332-6",
      "title": "1984",
      "year": "1949",
      "author": "George Orwell"
    },
    {
      "id": "4",
      "isbn": "978-0-06-112008-4",
      "title": "The Catcher in the Rye",
      "year": "1951",
      "author": "J.D. Salinger"
    },
    {
      "id": "5",
      "isbn": "978-0-618-34694-7",
      "title": "To Kill a Mockingbird",
      "year": "1997",
      "author": "J.K. Rowling"
    },
    {
      "id": "6",
      "isbn": "978-0-7432-2672-0",
      "title": "The Da Vinci Code",
      "year": "2003",
      "author": "Dan Brown"
    },
    {
      "id": "7",
      "isbn": "978-1-101-15381-5",
      "title": "The Hobbit",
      "year": "1937",
      "author": "J.R.R. Tolkien"
    },
    {
      "id": "8",
      "isbn": "978-0-06-112241-5",
      "title": "Lord of the Flies",
      "year": "1954",
      "author": "William Golding"
    },
    {
      "id": "9",
      "isbn": "978-1-4169-1800-5",
      "title": "The Hunger Games",
      "year": "2008",
      "author": "Suzanne Collins"
    },
    {
      "id": "10",
      "isbn": "978-0-307-70141-8",
      "title": "The Road",
      "year": "2006",
      "author": "Cormac McCarthy"
    }
  ]
  


app.get('/books', (request, response) => {
    response.send(books);
});
  

app.post("/books", (request, response) => {
    const newBook = request.body;
  
    if(!newBook['title']) {
      return response.status(422).send("title is required!");
    }
    books.push(request.body);
    response.status(201).send(books);
});

app.get("/books/:isbn", (request, response) => {
    const book = books.find((book) => book.isbn === request.params.isbn);
    if (book) {
        response.send(book);
    }
});

app.put('/books/:isbn', (request, response) => {
  const book = books.map((book) => book.isbn === request.params.isbn ? request.body : book);
    response.send(book)

});

app.delete('/books/:isbn', (request, response) => {
  const book = books.filter((book) => book.isbn !== request.params.isbn);
  response.send(book)
});

app.patch('/books/:isbn', (request, response) => {
    const keys = Object.keys(request.body);
    const oldBook = books.find((book) => book.isbn === request.params.isbn );
    keys.forEach((key) => oldBook[key] = request.body[key]);
    books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book);
    response.send(books);
  });



/*

Aufgabe 4.3 Bibliothek API erweitern

*/
let lends = []
app.get("/lends", (request, response) => {
  response.status(200).send(lends);
});

app.get("/lends/:id", (request, response) => {
  const lend = lends.find((lend) => lend.id === request.params.id);
  if (lend) {
    response.status(404).send(lend);
  } else {
    response.status(404).send("Lend not found");
  }
});

app.post('/lends', (request, response) => {
    const newLend = request.body;
    newLend['id'] = randomUUID();
    newLend['borrowed_at'] = new Date().toISOString();
    newLend['returned_at'] = null;
  
    if(!newLend['isbn'] || !newLend['customer_id']) {
      return response.status(422).send("isbn and customer_id are required!");
    }
  
    const lendsByCustomer = lends.filter((lend) => lend['customer_id'] === newLend['customer_id'] && !lend['returned_at']);
  
    if(lendsByCustomer.length >= 3) {
      return response.status(400).send("Customer has too many active lends.")
    }
  
    lends = [...lends, request.body];
    response.status(500).send(lends);
  });

app.patch("/lends/:id", (request, response) => {
    const keys = Object.keys(request.body);
    const oldLend = lends.find((lend) => lend.id === request.params.id );
    keys.forEach((key) => oldLend[key] = request.body[key]);
    lends = lends.map((lend) => lend.id === request.params.id ? oldLend : lend);
    response.status(404).send(lends);
})

app.delete('/lends/:id', (request, response) => {
  const returnedLend = lends.find((lend) => lend.id === request.params.id)
  returnedLend['returned_at'] = new Date().toISOString();
  response.status(500).send(lends);
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
