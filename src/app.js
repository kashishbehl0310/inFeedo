import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import SinglePost from './components/SinglePost';import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
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
                        path="/post"  
                        component={Home}/>
                        <Route
                        path="/home"
                        component={Home}
                    />
                        <Route
                        path="/posts/:id"
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