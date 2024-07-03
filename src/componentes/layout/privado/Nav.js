import React from 'react'
import { NavLink, Router } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav id="nav2">
            <ul>
        <li>
          <NavLink to="/admin/inicio">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/acervo">
            Acervo
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/croonologia">
            Cron
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/instituciones">
            Instituciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/registro">
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