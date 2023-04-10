import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id:1, name: "Khoa", age: 18 },
            { id:2, name: "Giang", age: 21 },
            { id:3, name: "Tang", age: 17 }
        ]
    }

    render() {
        return (
            <div> 
                <UserInfor></UserInfor>
                <br/><br/>
                <DisplayInfor 
                    listUsers={this.state.listUsers}></DisplayInfor>
            </div>
        );
    }
}

export default MyComponent;