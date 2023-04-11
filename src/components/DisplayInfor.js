import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg';

class DisplayInfor extends React.Component {
    constructor(props){
        console.log('call constructor: 1')
        super(props);
        this.state = {
            isShowListUser: true,
        }
    }
    

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    } 

    componentDidMount = () =>{
        console.log('call me')
        setTimeout(() => {
            document.title ='khoa'
        })
    }
    
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        console.log('cal me update',this.props, prevProps)
        if(this.props.listUsers !== prevProps.listUsers) {
            if(this.props.listUsers.length === 5) {
                alert('You got 5 client')
            }
        }
    }

    render() {
        console.log('call me render')
        const {listUsers} = this.props;
        return (
            <div className="display-infor-container">
                {/* <img src={logo}/> */}
                <div>
                    <span onClick={() => {this.handleShowHide()}}>
                    {this.state.isShowListUser === true? "Hide List User" : "Show List User"}
                    </span>
                    <br/>
                </div>
                { this.state.isShowListUser && 
                <>
                    {listUsers.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div >My name is {user.name}.</div>
                                    <div>My age is {user.age}.</div>
                                    <div>
                                        <button onClick={() => this.props.handleDeleteUser(user.id)}>
                                            Delete
                                        </button>
                                    </div>
                                    <hr/>
                                </div>
                            )
                    })}
                </>
                }
            </div>
        );
    }
}

export default DisplayInfor;