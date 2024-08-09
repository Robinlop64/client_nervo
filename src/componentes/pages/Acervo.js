import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Acervo = () => {
  const [numeroBienes, setNumeroBienes] = useState({
    fotografia: null,
    iconografia: null,
    libros: null,
    hemerografia: null,
    correspondencia: null,
    documentacion: null,
    partituras: null,
    objetos: null,
    monumentos: null,
    audiovisuales: null,
  });

  const fetchNumeroBienes = (tipo) => {
    fetch(`https://backend-prueba-apel.onrender.com/api/${tipo}/numero-bienes`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setNumeroBienes(prevState => ({ ...prevState, [tipo]: data.count }));
        }
      })
      .catch(error => console.error(`Error fetching data for ${tipo}:`, error));
  };

  useEffect(() => {
    const tipos = [
      'fotografia', 'iconografia', 'libros', 'hemerografia',
      'correspondencia', 'documentacion', 'partituras', 
      'objetos', 'monumentos', 'audiovisuales'
    ];
    tipos.forEach(tipo => fetchNumeroBienes(tipo));
  }, []);

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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.fotografias !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.fotografia}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.iconografia !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.iconografia}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.libros !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.libros}</p>
                  )}
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
                  <p className='description'>Conjunto de las publicaciones periódicas</p>
                  {numeroBienes.hemerografia !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.hemerografia}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.correspondencia !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.correspondencia}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.documentacion !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.documentacion}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.partituras !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.partituras}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.objetos !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.objetos}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.monumentos !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.monumentos}</p>
                  )}
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
                  <p className='description'>Conjunto de las fotografías</p>
                  {numeroBienes.audiovisuales !== null && (
                    <p className='description'>Número de bienes: {numeroBienes.audiovisuales}</p>
                  )}
                </div>
              </article>
            </NavLink>


            <p id='bienesTotales'><h2>Número de bienes totales:</h2> {Object.values(numeroBienes).reduce((total, num) => total + (num || 0), 0)}</p>

          </section>
        </div>
      </main>
    </div>
  );
}
