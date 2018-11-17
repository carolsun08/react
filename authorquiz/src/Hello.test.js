import React from "react"; 
import ReactDOM from "react-dom"; 
import Enzyme, {shallow} from "enzyme"; 
import Adapter from "enzyme-adapter-react-16"; 

function Hello(props) {
    return <h1>Hello at {props.now}</h1>
}

const moment = new Date(1588946400000)

describe("When setting up testing", () => {
    let result; 
    beforeAll(() => {
        result = Hello({now: moment.toISOString()}); 
    }); 

    it('should return a value', () => {
        expect(result).not.toBeNull();
    });

    it('should a h1', () => {
        expect(result.type).toBe("h1")
    });

    it('should has children', () => {
        expect(result.props.children).toBeTruthy(); 
    });

    it("should fail" , () => {
        expect(1+ 1).toBe(2); 
    }); 
});

describe('When testing with ReactDOM', () => {
    it('should render without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toISOString()}/>, div); 
        
    });
});

Enzyme.configure({ adapter: new Adapter()}) ;
describe('When testing with Enzyme', () => {
    it('should render h1', () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />); 
        expect(wrapper.find("h1").length).toBe(1); 
    });
    
    it('should contains Hello at xxxx', () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />); 
        expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.000Z</h1>)).toBe(true);
        // same as above - but validate the h1 content directly:  test failure will be more useful with the actual value 
        expect(wrapper.find("h1").at(0).text()).toBe("Hello at 2020-05-08T14:00:00.000Z"); 
    });
});