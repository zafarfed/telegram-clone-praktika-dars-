import React, {Component} from 'react';
import './index.css'

class Index extends Component {

    state={
        inputValue:''
    }

    changeMessageInput=(event)=>{
        this.setState({
            inputValue:event.target.value
        })
    }
    sendMessage=()=>{
        let from = 0;
        let to = this.props.selectedUser.id;
        let text = this.state.inputValue;
        this.props.sendMessage(from,to,text)
        this.setState({
            inputValue:''
        })
    }


    render() {
        const {selectedUser, history}=this.props;
        const {inputValue}=this.state;
        return (
            <div>
            {selectedUser ?
                    <div className={'content'}>
                        <div className="row">
                            <div className="col-md-12 content-header">
                                <h4 className={'mt-3'}>{selectedUser.firstname+' '+selectedUser.lastname+' '+selectedUser.phone}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 content-body">
                                {
                                    history.map((item,index)=>
                                        <div className={'row'}>
                                            <div className={`col-md-7 message ${item.id===0?'offset-5':''}`}>
                                                <p className={'text-white mt-1'}>{item.text}
                                                <span>{item.date}</span>
                                                </p>

                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="col-md-12 inputClass">
                                <input type={'text'} className={'form-control'} value={inputValue} onChange={this.changeMessageInput} placeholder={'Write a message...'}/>
                                <button className={'sendButtonClick'} onClick={this.sendMessage}><i className="fab fa-telegram-plane"></i></button>
                            </div>
                        </div>

                    </div> : <div></div>

            }
            </div>
        );
    }
}

export default Index;