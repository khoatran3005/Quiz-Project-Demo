import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Khoa Tran',
        address: 'Atlanta',
        age: 21
    }

    handleClick = (_event) => {

        this.setState({
            name: 'Leo',
            age: Math.floor(Math.random() * 100) + 1
        })
        
        console.log('My name is', this.state.name, "I'm ", this.state.age);
    }

    handleOnMouseOver(event) {
        console.log(event.clientX)
    }

    render() {
        return (

            <div> Hello World với {this.state.name} and Khoa's age is {this.state.age}
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}

export default MyComponent;