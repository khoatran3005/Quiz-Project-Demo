import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id:1, name: "Khoa", age: 18 },
            { id:2, name: "Giang", age: 21 },
            { id:3, name: "Tang", age: 17 }
        ]
    }

    handleAddNewUser = (userObj) =>{

        
        this.setState({
            listUsers:[userObj, ...this.state.listUsers]
        })
    }

    handleDeleteUser = (userId) =>{
        let listUsersClone = this.state.listUsers;
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        this.setState({
            listUsers: listUsersClone
        })
    }

    render() {
        
        const test = true

        return (
            <> 
                {test}
                <AddUserInfor handleAddNewUser={this.handleAddNewUser}></AddUserInfor>
                <br/><br/>
                <DisplayInfor 
                    listUsers={this.state.listUsers}
                    handleDeleteUser={this.handleDeleteUser}
                    >
                </DisplayInfor >
            </>
        );
    }
}

export default MyComponent;