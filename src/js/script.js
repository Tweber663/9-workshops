const domRef = {
  //Books List dom location
  booksList: '.books-list', 
  // Handle created template 
  bookTemp: '#template-book',
};

const handleRef = {
    //Handlebar compiler function -> on which we use the '#template-book'
    bookListHandle: Handlebars.compile(document.querySelector(domRef.bookTemp).innerHTML),
}


// Modify render function to accept a callback
const render = (callback) => {
    for (let bookID in dataSource.books) {
        const HTMLElem = handleRef.bookListHandle(dataSource.books[bookID]);
        const DOMElem = utils.createDOMFromHTML(HTMLElem); 
        document.querySelector(domRef.booksList).appendChild(DOMElem);  
    }
    // Call the callback function after rendering is complete
    if (typeof callback === 'function') {
        callback();
    }
};

//Respons for adding fav books
const initActions = () => {

    //Fav book storage
    const favoriteBooks = []

    //Book List wrapper
    const bookList = document.querySelector(domRef.booksList);

    //Cycling through each book
    Array.from(bookList.children).forEach((book) => {
    
        //Listenting to double clik
        book.addEventListener('dblclick', function(event) {
            event.preventDefault();
            //Adding a new class 
            book.children[1].classList.toggle('favorite')
            //Grabbing id number of each book
            const dataId = book.children[1].getAttribute('data-id');
            
            //Checks is the book alredy exsists in the array
            if (!favoriteBooks.some(b => b.bookId === dataId)) {
            //If NOT we add a new obj
                favoriteBooks.push({bookId: dataId})
            } else  {
            //If DOES we slice / remove the exsisting one
                favoriteBooks.splice(favoriteBooks[dataId], 1)
            }

            console.log(favoriteBooks);
        })
    })
}
// Call render with initActions as the callback
render();
initActions();

