import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
        return (
            <div id='nav'>
               <section className='nav-button'>
                <h4>
                <NavLink to="/">Home</NavLink>
                </h4>
              </section>
              <section className='nav-button'>
                <h4>
                <NavLink to="/equations">Equations</NavLink>
                </h4>
              </section>
              <section className='nav-button'>
                <h4>
                <NavLink to="/">Directions</NavLink>
                </h4>
              </section>
            </div>
        )
}

