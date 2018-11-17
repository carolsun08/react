import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-jsonschema-form";

const schema = {
  "title": "Identity",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "minLength": 1,
      "maxLength": 6
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "number",
      "title": "Age"
    }
  }
};

ReactDOM.render((
  <Form schema={schema} noHtml5Validate onSubmit={console.log} showErrorList={false} />
), document.getElementById("form_root"));

