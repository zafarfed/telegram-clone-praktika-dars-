import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App";

class Index extends Component {
    render() {
        return (
            <div>
                <App/>
            </div>
        );
    }
}
ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)

