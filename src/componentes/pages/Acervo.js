import React from 'react';
import { NavLink } from 'react-router-dom';

export const Acervo = () => {
  const handleNavLinkClick = (event) => {
    event.stopPropagation(); // Evita que el evento de clic se propague
  };

  return (
    <div>
      <main id="main_acervo">
        <div className='container_acervo'>
          <section className='acervo_pages'>
            <NavLink to="/admin/fotografias" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/fotografias.jpg" 
                    alt="Fotografía" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Fotografía</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/iconografia" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/iconografia.png" 
                    alt="Iconografía" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Iconografía</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/libros" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/libros.jpg" 
                    alt="Libros" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Libros</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/hemerografia" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/hemerografia.jpg" 
                    alt="Publicaciones periódicas" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Publicaciones periódicas</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/correspondencia" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/correspondencia.jpg" 
                    alt="Correspondencia" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Correspondencia</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/documentacion" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/documentacion.jpg" 
                    alt="Documentación" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Documentación</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/partituras" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/partituras.png" 
                    alt="Partituras" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Partituras</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/objetos" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/objetos.jpg" 
                    alt="Objetos personales" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Objetos personales</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/monumentos" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/monumentos.jpg" 
                    alt="Monumentos" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Monumentos</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/audiovisuales" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://backend-prueba-apel.onrender.com/imagenes/general/Acervo/audiovisuales.jpg" 
                    alt="Audiovisuales" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Audiovisuales</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>
          </section>
        </div>
      </main>
    </div>
  );
}
