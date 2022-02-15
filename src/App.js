import React, {Component} from 'react';
import  Sider from './Sider/index'
import  Content from './Content/index'
import './index.css'

class App extends Component {

    state={
        users:[],
        selectedUser:'',
        messages:[],
        history:[],
    }

    addUser=(firstname, lastname, phoneNumber)=>{
        let  a = this.state.users;
        a.push({id:a.length,firstname: firstname, lastname:lastname, phone:phoneNumber})
        this.setState({
            users:a
        })
        localStorage.setItem('users',JSON.stringify(a))
    }

    sendMessage=(fromId, toId, textId)=>{
        let date = new Date();
        let message={
            from:fromId,
            to:toId,
            text:textId,
            date:date.getHours()+':'+date.getMinutes()
        }
        let a = this.state.messages
        a.push(message)
        this.setState({
            message:a
        })
        localStorage.setItem('messages',JSON.stringify(a))
        this.getMessageHistory(this.state.users.filter(item=>item.id===toId)[0])
    }

    componentDidMount() {
        let usersString = localStorage.getItem('users',)
        if (usersString){
            let usersArray = JSON.parse(usersString)
            this.setState({
                users:usersArray
            })

        }

        let selectedUser = localStorage.getItem('selectedUser')
        if (selectedUser){
            let a = JSON.parse(selectedUser)
            this.setState({
                selectedUser:a
            })
            this.getMessageHistory(a)
        }

        let messages = localStorage.getItem('messages')
        if (messages){
            let a = JSON.parse(messages)
            this.setState({
                messages:a
            })
        }
    }
    selectUser=(user)=>{
        this.setState({
            selectedUser:user,
        })
        localStorage.setItem('selectedUser',JSON.stringify(user))
        this.getMessageHistory(user)
    }

    getMessageHistory=(user)=>{
        let b = localStorage.getItem('messages')
        if(b){
            let messages = JSON.parse(b);  
        let history = messages.filter(item=>item.from===0 && item.to===user.id || item.from===user.id && item.to===0)
        this.setState({
            history
        })
        }
    
    }

    

    render() {
        const {users, selectedUser, history}=this.state;
        return (
            <div  className={'container-fluid '}>
                <div className="row">

                    <div className="col-md-4 sider-parent">
                        <Sider users={users} addUser={this.addUser} selectUser={this.selectUser} selectedUser={selectedUser}/>
                    </div>

                    <div className="col-md-8 chat_content">
                        <Content history={history} selectedUser={selectedUser} sendMessage={this.sendMessage}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;