import React, {Component} from 'react';
//import {Routes,Route} from 'react-router';
import {LoginPage} from './components/LoginPage';
import {authenticationService} from "./Services";
import {PrivateRoute} from "./components";
import './custom.css'
import {history} from "./_helpers";
import {Router, Route, Link} from "react-router-dom";
import {Jumbotron} from "reactstrap";
import Dashboard from "./components/Dashboard";
import {ToastProvider} from "react-toast-notifications";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({currentUser: x}));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const {currentUser} = this.state;
        return (
            <Router history={history}>
                <div className="jumbotron">
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                {/*<Link to="/" className="nav-item nav-link">Home</Link>*/}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                <label>{currentUser.username}</label>
                            </div>
                        </nav>
                    }

                    <div className="">
                        <ToastProvider>
                        <PrivateRoute exact path="/" component={Dashboard}/>
                        <Route path="/login" component={LoginPage}/>
                        </ToastProvider>
                    </div>
                  
                </div>
            </Router>
        )
    }
}
