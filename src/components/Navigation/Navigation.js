import React from 'react';
import {
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem
} from 'react-bootstrap';
import {Link} from 'react-router';
import githubIcon from '../../images/GitHub-Mark-Light-32px.png';
import styles from './styles/styles.js';

const menuItems = [{
  href: "/blocks",
  title: "Blocks"
}, {
  href: "/#expresslanesimages",
  title: "Express Lanes Images"
}, {
  href: "/gameoflife",
  title: "Game Of Life"
}, {
  href: "/pyramids",
  title: "Pyramids"
}];


const Navigation = () => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            Drewtastic
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown
            eventKey={3}
            title="Projects"
            id="basic-nav-dropdown"
          >
            {menuItems.map((menuItem, i) => (
              <MenuItem
                eventKey={`3.${i + 1}`}
                key={i}
                href={menuItem.href}
              >
                {menuItem.title}
              </MenuItem>
            ))}
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="https://github.com/drew28/drewtastic-heroku">
            View on GitHub
            <img
              alt="View on GitHub"
              height={16}
              src={githubIcon}
              style={styles.githubIcon}
              width={16}
            />
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
