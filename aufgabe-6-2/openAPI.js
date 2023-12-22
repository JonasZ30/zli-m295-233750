const express = require('express')
const swagger = require("swagger-autogen")
const swaggerUI = require("swagger-ui-express")
const app = express()
const port = 3900

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*

Aufgabe 4.2 Bibliothek API umsetzen

*/
let books = [
    {
      id: "1",
      isbn: "978-0-385-48643-9",
      title: "To Kill a Mockingbird",
      year: "1960",
      author: "Harper Lee",
    },
    {
      id: "2",
      isbn: "978-0-307-94877-4",
      title: "The Great Gatsby",
      year: "1925",
      author: "F. Scott Fitzgerald",
    },
    {
      id: "3",
      isbn: "978-1-250-02332-6",
      title: "1984",
      year: "1949",
      author: "George Orwell",
    },
    {
      id: "4",
      isbn: "978-0-06-112008-4",
      title: "The Catcher in the Rye",
      year: "1951",
      author: "J.D. Salinger",
    },
    {
      id: "5",
      isbn: "978-0-618-34694-7",
      title: "To Kill a Mockingbird",
      year: "1997",
      author: "J.K. Rowling",
    },
    {
      id: "6",
      isbn: "978-0-7432-2672-0",
      title: "The Da Vinci Code",
      year: "2003",
      author: "Dan Brown",
    },
    {
      id: "7",
      isbn: "978-1-101-15381-5",
      title: "The Hobbit",
      year: "1937",
      author: "J.R.R. Tolkien",
    },
    {
      id: "8",
      isbn: "978-0-06-112241-5",
      title: "Lord of the Flies",
      year: "1954",
      author: "William Golding",
    },
    {
      id: "9",
      isbn: "978-1-4169-1800-5",
      title: "The Hunger Games",
      year: "2008",
      author: "Suzanne Collins",
    },
    {
      id: "10",
      isbn: "978-0-307-70141-8",
      title: "The Road",
      year: "2006",
      author: "Cormac McCarthy",
    },
];


app.get('/books', (request, response) => {
    response.status(200).send(books);
  });
  

app.post("/books", (request, response) => {
    // immutable manipulation
    books = [...books, request.body];
    // mutable manipulation
    books.push(request.body);
    response.status(201).send(books);
});

app.get("/books/:isbn", (request, response) => {
    const book = books.find((book) => book.isbn === request.params.isbn);
    if (book) {
      response.status(200).send(book);
    } else {
      response.status(404).send("Book not found");
    }
  });

app.put('/books/:isbn', (request, response) => {
  const book = books.map((book) => book.isbn === request.params.isbn ? request.body : book);
    response.status(200).send(book)

});

app.delete('/books/:isbn', (request, response) => {
  const book = books.filter((book) => book.isbn !== request.params.isbn);
  response.status(200).send(book)
});

app.patch('/books/:isbn', (request, response) => {
    const keys = Object.keys(request.body);
    const oldBook = books.find((book) => book.isbn === request.params.isbn );
    keys.forEach((key) => oldBook[key] = request.body[key]);
    books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book);
    response.status(200).send(books);
  });



/*

Aufgabe 4.3 Bibliothek API erweitern

*/
const d = new Date();
let day = d.getDate();

let lends = [
    {
        id: "1",
        customer_id: "9183-882",
        isbn: "978-0-307-70141-8",
    },
    {
        id: "2",
        customer_id: "5678-456",
        isbn: "978-0-385-48643-9",
    },
    {
        id: "3",
        customer_id: "1234-789",
        isbn: "978-0-7432-2672-0",
    },
    {
        id: "4",
        customer_id: "9876-543",
        isbn: "978-1-4169-1800-5",
    },
    {
        id: "5",
        customer_id: "6543-210",
        isbn: "978-1-101-15381-5",
    },
    {
        id: "6",
        customer_id: "8765-432",
        isbn: "978-0-618-34694-7",
    },
    {
        id: "7",
        customer_id: "5432-109",
        isbn: "978-0-307-94877-4",
    },
    {
        id: "8",
        customer_id: "2109-876",
        isbn: "978-0-06-112008-4",
    },
    {
        id: "9",
        customer_id: "8901-234",
        isbn: "978-1-250-02332-6",
    },
    {
        id: "10",
        customer_id: "3456-789",
        isbn: "978-0-006-45678-9",
    }
];


app.get("/lends", (request, response) => {
    response.status(200).send(lends);
  });

app.get("/lends/:id", (request, response) => {
    const lend = lends.find((lend) => lend.id === request.params.id);
    if (lend) {
      response.status(200).send(lend);
    } else {
      response.status(404).send("Lend not found");
    }
  });

  app.post("/lends", (request,response) => {
    const newLend = request.body;
    newLend['borrowed_at'] = new Date().toISOString();
    lends = [...lends, request.body];
    response.status(201).send(lends);
  })
  

app.patch("/lends/:id", (request, response) => {
    const keys = Object.keys(request.body);
    const oldLend = lends.find((lend) => lend.id === request.params.id);
    keys.forEach((key) => oldLend[key] = request.body[key]);
    lends = lends.map((lend) => lend.id === request.params.id ? oldLend : lend);
    response.status(200).send(lends);
  });

  // Kopie vom Plenum
  app.delete('/lends/:id', (request, response) => {
    const returnedLend = lends.find((lend) => lend.id === request.params.id)
    returnedLend['returned_at'] = new Date().toISOString();
    response.send(lends);
  });

  const doc = {
    info: {
      title: 'All APIs',
      description: 'Testing Swagger',
      version: "0.1.0",
    },
  };
  
  const myAPI = ["./openAPI.js"]
  const swaggerDocument = "./swagger.json"
  swagger(swaggerDocument,myAPI, doc) .then(() =>{
    const document = require(swaggerDocument);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(document, doc));
  })
 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
