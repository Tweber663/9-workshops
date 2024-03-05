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

//Book rendering function
const bookRendering = () => {

//Grab 'dataSource' and cycle throught each book. 
for (let bookID in dataSource.books) {

    //Using the handlebars complier to tranfrom obj data into hmtl text
    const HTMLElem = handleRef.bookListHandle(dataSource.books[bookID]);
    //Using the external function we transform html text to DOM element
    const DOMElem = utils.createDOMFromHTML(HTMLElem); 
    //Uplaoding the DOM element to HTML 
    document.querySelector(domRef.booksList).appendChild(DOMElem); 
}

};


bookRendering();