import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import './bootstrap.min.css'; 
import AuthorQuiz from './AuthorQuiz';
import {shuffle, sample} from 'underscore';
import * as serviceWorker from './serviceWorker';
import Identity from './Identity';
import AddAuthorForm from "./AddAuthorForm"; 

const schema = {
  "title": "Author", 
  "type": "object", 
  "required": [
    "firstName", "lastName", "imageUrl"
  ],
  "properties": {
    "firstName": {
      "type": "string", 
      "title": "First Name",
      "minLength": 2, 
      "maxLength": 20
    },
    "lastName": {
      "type": "string", 
      "title": "Last Name",
      "minLength": 2, 
      "maxLength": 20
    },
    "age": {
      "type": "number",
      "title": "Age",
      "minimum": 18, 
      "maximum": 200
    },
    "imageUrl": {
      "type": "string",
      "title": "Image URL"
    },
    "books": {
      "type": "array",
      "title": "Books",
      "items": {
        "type": "string"
      }
    }
  }
}

const uiSchema = {
  firstName: {
    "ui:autofocus" : true
  },
  age: {
    "ui:widget": "range",
    "ui:description": "(earthian year)"
  },
  books: {
    "items": {
      "ui:emptyValue": ""
    }
  }
}

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

function getTurnData() {
  const allBooks = authors.reduce(function(prevValue, currentValue, currentIndex) {
      return prevValue.concat(currentValue.books); 
  }, 
  []);    // initial value - none

  // NOTE: this logic might yield multiple correct answers - improve it to only 1 correct?  
  const fourRandomBooks = shuffle(allBooks).slice(0,4); 
  const answer = sample(fourRandomBooks);

  return {
      books: fourRandomBooks,
      author: authors.find(author => author.books.some(title => title === answer))
  }
}

function resetState() {
  return {
    turnData: getTurnData(),
    highlight: ''
}; 
}
let state = resetState(); 

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong'; 
  render(); 
}

function App() {
  return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected} 
    onContinue={() => {
        state = resetState(); 
        render(); 
    }} />; 
}

const AuthorFormWrapper = withRouter(( {history} ) => 
  <AddAuthorForm schema={schema} uiSchema={uiSchema} onAddAuthor={ (author) => {
    authors.push(author); 
    history.push("/");  // redirect client to the index page
  } } />
  ); 

function render() {
  // ReactDOM.render(<App/>, document.getElementById('root'));

  // add routing: 
  // NOTE: React.Fragment has no effect on DOM, but just to satisfy React requirement: Router can have only one child element
   
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment> 
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorFormWrapper} />
      </React.Fragment>
    </BrowserRouter>, 
    document.getElementById('root')
  );
  

  // How to render both components ?
  //ReactDOM.render(<Identity />, document.getElementById('root'));
}

render(); 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
