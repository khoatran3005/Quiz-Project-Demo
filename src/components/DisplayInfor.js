import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg';

// class DisplayInfor extends React.Component {
//     constructor(props){
//         console.log('call constructor: 1')
//         super(props);
//         this.state = {
//             isShowListUser: true,
//         }
//     }

//     render() {
//         console.log('call me render')
//         const {listUsers} = this.props;
//         return (
//             <div className="display-infor-container">
//                 { true && 
//                 <>
//                     {listUsers.map((user, index) => {
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                     <div >My name is {user.name}.</div>
//                                     <div>My age is {user.age}.</div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>
//                                             Delete
//                                         </button>
//                                     </div>
//                                     <hr/>
//                                 </div>
//                             )
//                     })}
//                 </>
//                 }
//             </div>
//         );
//     }
// }

const DisplayInfor = (props) => {
    const { listUsers } = props;
    return (
        <div className="display-infor-container">
            {true &&
                <>
                    {listUsers.map((user, index) => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div >My name is {user.name}.</div>
                                <div>My age is {user.age}.</div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    );
}


export default DisplayInfor;