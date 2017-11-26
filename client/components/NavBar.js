import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
        return (
            <nav id="nav">
            <div className="nav-wrapper #2196f3 blue darken-1">
              <ul>
                <li>
                <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="/equations">Equations</NavLink>
                </li>
                <li>
                <NavLink to="/">Directions</NavLink>
                </li>
              </ul>
            </div>
            </nav>
        )
}

