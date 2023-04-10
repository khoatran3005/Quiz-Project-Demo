import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    render() {
        return (
            <div> 
                <UserInfor></UserInfor>
                <br/><br/>
                <DisplayInfor name='Giang' age="22" myInfor={['a','d','c']}></DisplayInfor>
                <hr/>
                <DisplayInfor name='Eric' age="25" ></DisplayInfor>
            </div>
        );
    }
}

export default MyComponent;