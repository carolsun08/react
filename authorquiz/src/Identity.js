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

class Identity extends React.Component {
    constructor() {
        super(); 
        this.state = {
            firstName: "", 
            lastName: ""
        }; 
        this.onFieldChange = this.onFieldChange.bind(this);

        this.myDiv = React.createRef(); 
    }

    // called after the component has been rendered 
    componentDidMount() {
        // directly using DOM element - UNSAFE to inject unchecked input, could cause XSS and inject malicious code
        this.myDiv.current.innerHTML += "<br/> Set on the wrapped DOM element. <strong>UNSAFE</strong>"
    }

    onFieldChange(event) {
        this.setState ( {
            [event.target.name] : event.target.value    // [xxx] to dynamically resolve the name programmatically 
        }); 
    }

    render() {
        return (
            /* 
            <form>
                <input type="text" name="firstName" value={this.state.firstName} placeholder="First name" onChange={this.onFieldChange}/>
                <input type="text" name="lastName" value={this.state.lastName} placeholder="Last name" onChange={this.onFieldChange}/>
            </form>
            */
           // string rendered here is safe : react will auto-escape 
           <div ref={this.myDiv}>{"set in render : <strong>SAFE</strong>"}</div>
           //<Form schema={schema} noHtml5Validate onSubmit={console.log} showErrorList={false} />
        )
    }
}

export default Identity;