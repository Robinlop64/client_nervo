import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MonumentosDetalle = () => {
  const { id } = useParams();
  const [fotografia, setFotografia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/monumentos/icon/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.monu);
      } else {
        // Manejo de error
      }
    };

    fetchFoto();
  }, [id]);

  if (!fotografia) {
    return <div>Loading...</div>;
  }

  const getNavigationPath = () => {
    const { pais, institucion, tema } = fotografia;
    return (
      <>
        <span onClick={() => navigate(`/pais/${pais}`)}>{pais}</span> /
        <span onClick={() => navigate(`/institucion/${institucion}`)}>{institucion}</span> /
        <span onClick={() => navigate(`/admin/fotografias`)}>Fotografias</span> /
        <span onClick={() => navigate(`/tema/${tema}`)}>{tema}</span>
      </>
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className='main_fotodetalle'>
      <div id='nav3'>
        <p>{getNavigationPath()}</p>
      </div>
      <div className="container_fotodetalle">
        <button onClick={() => navigate(-1)}>Regresar</button>

        <div className='barra_fotodetalle'>
          <h2>{fotografia.tema}</h2>
        </div>
        <div className='ficha_fotografia'>
        <div className='marco'>
          {console.log(fotografia)} {/* Verifica la estructura de fotografia.images */}
          {fotografia.images && fotografia.images.map((image, index) => (
            <img
              key={index}
              src={`https://backend-prueba-apel.onrender.com/imagenes/monumentos/${image.nombre}`}
              alt={`${fotografia.titulo} ${index + 1}`}
              className='fotografia-img-large'
            />
          ))}
        </div>
          <div className='contenido_fotodetalle'>
            <h3>{capitalizeFirstLetter(fotografia.titulo)}</h3>
            <p><span>Título:</span> <span>{fotografia.encabezado}</span></p>
            <p><span>Tipo de monumento:</span> <span>{fotografia.tipo_monumento}</span></p>
            <p><span>características físicas:</span> <span>{fotografia.descripcion_fisica}</span></p>
            <p><span>Ubicación:</span> <span>{fotografia.ubicacion}</span></p>
            <p><span>Entidad:</span> <span>{fotografia.entidad}</span></p>
            <p><span>Inscripciones:</span> <span>{fotografia.inscripciones}</span></p>
            <p><span>Fecha de inauguración:</span> <span>{fotografia.descripcion}</span></p>
           
          </div>
        </div>
      </div>
    </main>
  );
};
