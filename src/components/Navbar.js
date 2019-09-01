import React, {Component} from 'react';
import { Navbar, Nav} from "react-bootstrap";
import logo from '../assets/logo.png'

class HeaderNav extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Navbar className={this.props.isTop ? 'nav-unscrolled' : 'nav-scrolled'} bg="light" fixed="top" >
                    <Navbar.Brand href="/" >
                        <img className="Navlogo" src={logo} />
                    </Navbar.Brand>
                    <Nav className="mr-auto navLinks" >
                        <Nav.Link href="/home" style={{color: "#333"}} >Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/" className="signoutTab" style={{color: "#333"}} onClick={() => this.props.onClick}  >Sign Out</Nav.Link>
                    </Nav>
                    
                </Navbar>
            </div>
        )
    }
}

export default HeaderNav;