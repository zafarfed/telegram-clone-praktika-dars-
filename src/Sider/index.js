import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import './index.css'

class Index extends Component {

    state={
        modalVisible:false
    }

    toggle=()=>{
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    submitForm=(event)=>{
        event.preventDefault();
        let firstname= event.target[0].value;
        let lastname= event.target[1].value;
        let phoneNumber= event.target[2].value;
        // console.log(firstname,lastname,phoneNumber)
        this.props.addUser(firstname,lastname,phoneNumber)

        // console.log(this.props)
        this.toggle()
    }

    userClicked=(user)=>{
        this.props.selectUser(user)
    }

    render() {
        const {modalVisible}=this.state;
        const {users,selectedUser}=this.props;
        return (
            <div className={'sider'}>
                <button className={"btn btn-dark btn-block form-control mt-2"} onClick={this.toggle}> Add User </button>
                <hr/>

                <ul className={'list-group'}>
                    {users.map((item,index)=>
                    <li className={`list-group-item user ${selectedUser.id===item.id?'isActive':''}` } onClick={()=>this.userClicked(item)}>{item.firstname+' '+item.lastname}</li>
                    )}
                </ul>



                <Modal isOpen={modalVisible} toggle={this.toggle}>
                    <ModalHeader> Add User</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitForm} id={'addUser'}>
                            First Name :
                            <input placeholder={'firstname'} className={'form-control'} required/>

                            Last Name :
                            <input placeholder={'lastname'} className={'form-control'} required/>

                            Phone number :
                            <input placeholder={'phone number'} className={'form-control'} required/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-success'} form={'addUser'}>Save</button>
                        <button className={'btn btn-danger'} onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Index;