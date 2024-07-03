import React from 'react'
import { NavLink } from 'react-router-dom'

export const Registro = () => {
  return (
    <main className='main_registro'>
      <div className="contenedor_main_registro">
        <h1>Fromulario de registro de bienes</h1>
        <div className='frame_botones_registro'>
          <NavLink to="/registro/menu-iconografia">
            <button>
              Iconografía
            </button>
          </NavLink>
          <NavLink to="/registro/libros">
            <button>
              Libros
            </button>
          </NavLink>
          <NavLink to="/registro/periodicos">
            <button>
              Publicaciones periódicas
            </button>
          </NavLink>
          <NavLink to="/registro/correspondencia">
            <button>
              Correspondencia
            </button>
          </NavLink>
          <NavLink to="/registro/documentacion">
            <button>
              Documentación
            </button>
          </NavLink>
          <NavLink to="/registro/objetos">
            <button>
              Objetos personales
            </button>
          </NavLink>
          <NavLink to="/registro/partituras">
            <button>
              Partituras
            </button>
          </NavLink>
          <NavLink to="/registro/monumentos">
            <button>
              Monumentos
            </button>
          </NavLink>
          <NavLink to="/registro/audiovisuales">
            <button>
              Audiovisuales
            </button>
          </NavLink>
        </div>

      </div>

    </main>
  )
}
