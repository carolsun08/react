import React from 'react';
import './App.css';

import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <p>Select the book written by the Author shown</p>
    </div>
  </div>)
}

function Book({title, onAnswerSelected}) {
  return <div className="answer" 
              // NOT just onClick={onAnswerSelected{title}} - that will cause infinite loop on load
              // this is an actual HTML action 
              onClick={() => onAnswerSelected(title)}>
    <h4>{title}</h4>
  </div>; 
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgClr(highlight) { 
    const mapping = {
        'none': '', 
        'correct': 'green', 
        'wrong': 'maroon'
    }
    return mapping[highlight]; 
  }
 
  return <div className="row turn" style={{backgroundColor: highlightToBgClr(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author"/>
    </div>
    <div className="col-6">
      {books.map(title => <Book title={title} key={title} onAnswerSelected={onAnswerSelected} />)}
    </div>
  </div>;
}

// on propTypes failures: 
// app still works - but will display warnings in browser Console
Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imagetSource: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired, 
  onAnswerSelected: PropTypes.func.isRequired
};


function Continue({show, onContinue}) {
  return <div className="container-fluid">
    {show ? <div className="continue col-11">
      <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
    </div> : null}
  </div>; 
}

function AuthorQuiz ({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container-fluid">
      <h1>Author Quiz</h1>

      <p>Hello @ {new Date().toISOString()}</p>

      <Hero/>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue show={highlight==='correct'} onContinue={onContinue}/>
      <p><Link to="/add">Add Author</Link></p>
    </div>
  );
}

export default AuthorQuiz;
