import * as React from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <span>Poker Leaderboard</span>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    )
};

export default NavBar;