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
                    src="https://nervodigital.com.mx/acervo/imgs/fotografiasub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/dibujosub.png" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/librosub.jpg" 
                    alt="Libros" 
                  />
                </div>
                <div className='informacion-clas'>
                  <h4 className='title'>Libros</h4>
                  <p className='description'>Conjunto de las fotografias</p>
                </div>
              </article>
            </NavLink>

            <NavLink to="/admin/publicaciones" className="clasificacion" onClick={handleNavLinkClick}>
              <article>
                <div className='mascara'>
                  <img 
                    src="https://nervodigital.com.mx/acervo/imgs/hemerografiasub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/correspondenciasub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/documentosub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/partiturasub.png" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/objetosub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/monumentosub.jpg" 
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
                    src="https://nervodigital.com.mx/acervo/imgs/audiovisualsub.jpg" 
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
