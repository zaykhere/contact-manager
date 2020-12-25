import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faQuestion} from '@fortawesome/free-solid-svg-icons';

const Header=(props)=>{
  return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand"> {props.heading} </a>
      </div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to='/' className="nav-link" style={navLinkStyles}> 
         <FontAwesomeIcon icon={faHome}  /> Home</Link>
        </li>
        <li className="nav-item">
          <Link to='/add-contact' className="nav-link" style={navLinkStyles}>
          <FontAwesomeIcon icon={faPlus} /> Add</Link>
        </li>
        <li className="nav-item">
          <Link to='/about' className="nav-link" style={navLinkStyles}>
          <FontAwesomeIcon icon={faQuestion} /> About</Link>
        </li>
      </ul>
    </nav>
  )
}

const navLinkStyles ={
  color: 'white',
  fontSize: '16px'
}

Header.defaultProps={
  heading: 'Contact Manager'
};

export default Header;
