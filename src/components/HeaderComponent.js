import React, { Component } from 'react'
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
    render() {
        return (
           <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <h1>Nucamp</h1>
                            <h2>a better way to camp</h2>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top">
                        <div className="container">
                            <NavbarBrand href="/">NuCamp</NavbarBrand>
                        </div>
                </Navbar>
            </React.Fragment> 
        );
    }
}

export default Header;