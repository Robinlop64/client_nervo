import React from 'react'
import { NavLink, Router } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav id="nav2">
            <ul>
        <li>
          <NavLink to="/inicio">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/acervo">
            Acervo
          </NavLink>
        </li>
        <li>
          <NavLink to="/croonologia">
            Cron
          </NavLink>
        </li>
        <li>
          <NavLink to="/instituciones">
            Instituciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/registro">
            Yo te bendigo vida
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/logout  ">
            Logout
          </NavLink>
        </li>
      </ul>
        </nav>
        
    )
}