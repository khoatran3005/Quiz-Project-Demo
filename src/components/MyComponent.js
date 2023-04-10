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

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    render() {
        return (

            <div> Hello World với {this.state.name} and Khoa's age is {this.state.age}
                <button onClick={this.handleClick}>Click me</button>
                <form onSubmit={(event)=> this.handleOnSubmit(event)}>
                    <input 
                    type="text"
                    onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;