const domRef = {
  //Books List dom location
  booksList: '.books-list', 
  // Handle created template 
  bookTemp: '#template-book',
  //FIlter refrence
  filtersRef: '.filters',
};

const handleRef = {
  //Handlebar compiler function -> on which we use the '#template-book'
  bookListHandle: Handlebars.compile(document.querySelector(domRef.bookTemp).innerHTML),
};

// Renders information from data.js file on the sreen
const render = () => {

  //Cycle throught each book obj 
  for (let bookID in dataSource.books) {
    const bookObj = dataSource.books[bookID]
    
    //Adding new data to renderd information 
    //1. Backgroud color rating
    bookObj.ratingBgc = determineRatingBgc(bookObj.rating); //Callback function ->
    //2. Precante rating
    bookObj.ratingWidth = parseInt(Math.round(bookObj.rating).toString().padEnd(2, 0));

    //change data from data.js to html using HB
    const HTMLElem = handleRef.bookListHandle(bookObj);
    //change html from HB to DOM elements
    const DOMElem = utils.createDOMFromHTML(HTMLElem); 
    //Render the DOM element to the html
    document.querySelector(domRef.booksList).appendChild(DOMElem); 
    
  }
};

//Respons for adding fav books + prepares filters 
const initActions = () => {

  //Fav book storage
  const favoriteBooks = [];

  //Book List wrapper
  const bookList = document.querySelector(domRef.booksList);

  bookList.addEventListener('dblclick', function(event) {
    event.preventDefault();
    let targetEle = event.target.parentElement.parentElement;

    if (targetEle.classList.contains('book__image')) {
         //Adding a new class 
    targetEle.classList.toggle('favorite')
    //Grabbing id number of each book
    const dataId = targetEle.getAttribute('data-id');
            
    //Checks is the book alredy exsists in the array
    if (!favoriteBooks.some(b => b.bookId === dataId)) {
      //If NOT we add a new obj
      favoriteBooks.push({bookId: dataId});
    } else  {
      //If DOES we slice / remove the exsisting one
      favoriteBooks.splice(favoriteBooks[dataId], 1);
    }
    determineRatingBgc();
    }
  });

  //Stores info about what filters are currently selected
  const filters = [];

  const filterList = document.querySelector(domRef.filtersRef);
  
  //Event delegation event listener (listenting to wrapper filter list (radios)
  filterList.addEventListener('change', function(event) {
  if(event.target.type === 'checkbox' && event.target.checked) {
    filters.push(event.target.value);
  } else  if (!event.target.checked){
    console.log('removed:', event.target.value)
    let index = filters.indexOf(event.target.value);
    filters.splice(index, 1);
  }
  renderFilter(filters);
  })
}

//Responsible for rending filtered
const renderFilter = (filters) => {

  console.log(filters);

  for (let bookId of dataSource.books) {
    //Refrence to individual books

  const bookref = document.querySelector('[data-id="' + bookId.id + '"]');

   let notSelected = false;

   //We're getting the list of books that have NOT been under given criteria
    for (let filter of filters) {
      if (!bookId.details[filter]) {
        notSelected = true;
        console.log(bookId)
      }
    } //notSelected = true every time loops end with a book NOT matching given ctrieria

    // We enter into second verification process, wehre we tell the computer 
    // If book has exited with notSelected === true, for sure doesn't match the crtieria
    // So we hide this book
    if (notSelected === true) {
      bookref.classList.add('hidden');
    } else {
      bookref.classList.remove('hidden')
    }
  }
}

const determineRatingBgc = (rating) => {
  let gradient = '';
    if (rating > 9) {
      gradient = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
    } else if (rating > 8 && rating < 9) {
      gradient = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'
    } else if (rating > 6 && rating <= 8) {
      gradient = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)'
    } else {
      gradient = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);'
    }
    return gradient
}


// Call render with initActions as the callback
render();
initActions();