import React from 'react';

import ReactDOM from 'react-dom';
import Form from "react-jsonschema-form";

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            imageUrl: ""
        }

        this.onFieldChange = this.onFieldChange.bind (this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        // event.preventDefault();  // so won't submit to server side (not needed in json-schema-form)
        console.log("new author submitted: " , event)
        this.props.onAddAuthor({
            "name": event.formData.firstName + " " + event.formData.lastName, 
            "imageUrl": event.formData.imageUrl,
            "age": event.formData.age,
            "books": event.formData.books
        }); 
    }
    onFieldChange(event) {
        this.setState ( {
            [event.target.name] : event.target.value    // [xxx] to dynamically resolve the name programmatically 
        }); 
    }

    render() {
        return (
        <Form  className="authorForm" schema={this.props.schema} uiSchema={this.props.uiSchema} formData={defaultFormData} onSubmit={this.handleSubmit} />
        )
    }
}


const defaultFormData = {
    firstName: "",
    lastName: "",
    age: 61, 
    imageUrl: "images/grey_lady.png", 
    books: []
}; 


function AddAuthorForm({schema, uiSchema, match, onAddAuthor}) {
    return <div>
      <h1>Add Author</h1>
      <AuthorForm schema={schema} uiSchema={uiSchema} onAddAuthor={onAddAuthor}/> 
    </div>; 
  }

export default AddAuthorForm;