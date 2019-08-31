import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import SinglePost from './components/SinglePost';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

class App extends Component{
    render(){
        return(
            <div className="App">
                <BrowserRouter>
                    <div>
                    <Route
                        exact
                        path="/"
                        component={Login}
                    >
                       
                    </Route>
                    <Route 
                        exact 
                        path="/post"  
                        component={Home}>
                    </Route>
                    <Route
                        exact
                        path="/home"
                        component={Home}
                    >
                    </Route>
                   <Route
                    path="/:id"
                    component= {SinglePost }
                   />
                    </div>
                </BrowserRouter>
            </div>
            
        )
    }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />,mountNode)