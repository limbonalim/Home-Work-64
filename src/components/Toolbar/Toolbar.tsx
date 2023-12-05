import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import constants from '../../constants';

const Toolbar = () => {
  const linkList = constants.map(({id, title}) => {
    let path: string = (id === 'home') ? '/' : `/pages/${id}`;
    return (
      <li key={id} className="nav-item">
        <NavLink to={path} className="nav-link">{title}</NavLink>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Static Pages</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {linkList}
            <li className="nav-item">
              <NavLink to="/pages/admin" className="nav-link">Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;