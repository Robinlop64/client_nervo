import React from 'react'
import logo from "../../img/logo fundacion nuevo-02.png"

export const Header = () => {
  return (
    <header id="header">
            <div id="logo">
              <img src={logo} alt="logo"/>
            </div>
            <h1>
                <a href="index.html">
                     Amado Nervo
                </a>
            </h1>
        </header>
  )
}
