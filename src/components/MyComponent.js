import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Khoa Tran',
        address: 'Atlanta',
        age: 21
    }

    handleClick(_event) {
        console.log('My name is', this.state.name);
    }

    handleOnMouseOver(event) {
        console.log(event.clientX)
    }

    render() {
        return (

            <div> My First Component
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}

export default MyComponent;