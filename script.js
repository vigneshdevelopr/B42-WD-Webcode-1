const firstdiv = document.createElement('div');
const input = document.createElement('input');
input.type='text';
input.id='search-input';
firstdiv.appendChild(input);
const btn = document.createElement('button');

btn.innerHTML='Search';
btn.id='search-button';

firstdiv.appendChild(btn);
const resultdiv = document.createElement('div');
resultdiv.className = 'results';
resultdiv.id='search-results';
firstdiv.appendChild(resultdiv);
const refreshbtn = document.createElement('button');

refreshbtn.innerHTML='back';

refreshbtn.id='reload';
firstdiv.appendChild(refreshbtn);
document.body.append(firstdiv);
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;

 
});

const backButton = document.getElementById('reload');
backButton.addEventListener('click', () => {
  window.location.reload();
});





//--------------Functionality starts--------------------------------------------------
async function getBooks() {
    let page = 1;
    let moreData = true;
  
    while (moreData) {
      try {
        const response = await fetch(
          `https://www.anapioficeandfire.com/api/books?page=${page}`
        );
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          moreData = data.length > 0;
  
          for (const book of data) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book", "card", "mx-auto", "my-4");
            bookDiv.id = "main-div";
  
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.id = "name-id";
            cardBodyDiv.classList.add("card-body");
            cardBodyDiv.innerHTML = `<h5>BookName: <br>${book.name}</h5>`;
  
            const isbnParagraph = document.createElement("p");
            isbnParagraph.classList.add("card-text");
            isbnParagraph.innerHTML = `<span style="font-weight:bold">ISBN:</span> ${book.isbn}`;
  
            const pagesParagraph = document.createElement("p");
            pagesParagraph.classList.add("card-text");
            pagesParagraph.innerHTML = `<span style="font-weight:bold">Pages:</span> ${book.numberOfPages}`;
  
            for (const author of book.authors) {
              const authorDiv = document.createElement("div");
              authorDiv.innerHTML = `<span style="font-weight:bold">Author:</span> ${author}`;
              cardBodyDiv.appendChild(authorDiv);
          }

              const publisherParagraph = document.createElement("p");
              publisherParagraph.classList.add("card-text");
              publisherParagraph.innerHTML = `<span style="font-weight:bold">Publisher:</span> ${book.publisher}`;
    

              const releasedParagraph = document.createElement("p");
              releasedParagraph.classList.add("card-text");
              releasedParagraph.innerHTML = `<span style="font-weight:bold">Released:</span> ${book.released}`;
    
              const characterhead = document.createElement("h4");
              characterhead.innerHTML = "Characters: ";
              cardBodyDiv.appendChild(isbnParagraph);
              cardBodyDiv.appendChild(pagesParagraph);
              cardBodyDiv.appendChild(publisherParagraph);
              cardBodyDiv.appendChild(releasedParagraph);
              cardBodyDiv.appendChild(characterhead);
    
              const charactersElement = document.createElement("div");
              charactersElement.classList.add("card-text");
              book.characters.slice(0, 5).forEach((characterURL) => {
                (async () => {
                  try {
                    const response = await fetch(characterURL);
                    const character = await response.json();
                    const characterElement = document.createElement("div");
                    characterElement.innerHTML = character.name;
                    charactersElement.appendChild(characterElement);
                  } catch (error) {
                    console.error(error);
                  }
                })();
              });
              cardBodyDiv.appendChild(charactersElement);
    
              bookDiv.appendChild(cardBodyDiv);
    
              document.body.appendChild(bookDiv);
            
        
    }
    
          page += 1;
      } else {
        moreData = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
getBooks()
    
    document.querySelector("#search-button").addEventListener("click", () => {
      const searchTerm = document.querySelector("#search-input").value;
    
      document.querySelector("#main-div").classList.add("hidden");
    
      searchBooks(searchTerm);
    });
    
    async function searchBooks(searchTerm) {
        try {
          const searchResultsDiv = document.querySelector("#search-results");
      
          searchResultsDiv.innerHTML = "";
      
          const response = await fetch(`https://www.anapioficeandfire.com/api/books`);
      
          const data = await response.json();
      
          // Checking if the data is an array
          if (Array.isArray(data)) {
            const filteredBooks = data.filter((book) => {
              return book.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
      
            for (const book of filteredBooks) {
              const bookDiv = document.createElement("div");
              bookDiv.classList.add("book", "card");
              bookDiv.id="cards"
      
              const cardBodyDiv = document.createElement("div");
              cardBodyDiv.id = "name-id";
              cardBodyDiv.classList.add("card-body");
              cardBodyDiv.innerHTML = `<h5>BookName: <br>${book.name}</h5>`;
      
              searchResultsDiv.appendChild(bookDiv);
            }
      
            highlightSearchTerm(searchTerm);
          }
        } catch (error) {
          console.error(error);
        }
      }
      
      function highlightSearchTerm(searchTerm) {
        const bookCards = document.querySelectorAll(".book");
      
        bookCards.forEach((bookCard) => {
          const bookCardText = bookCard.textContent;
      
          // Replace the search

          const highlightedText = bookCardText.replace(
            new RegExp(searchTerm, "gi"),
            `<span class="highlight">${searchTerm}</span>`
          );
             bookCard.innerHTML = highlightedText;
 });
}

const style = document.createElement("style");
style.innerHTML = `
.highlight {
  background-color: yellow;
}
`;

// Appending the style element
document.head.appendChild(style);
    
