import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const LibrosDetalle = () => {
  const { id } = useParams();
  const [fotografia, setFotografia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/libros/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.libro);
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
      <div id='nav'>
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
              src={`https://backend-prueba-apel.onrender.com/imagenes/libros/${image.nombre}`}
              alt={`${fotografia.titulo} ${index + 1}`}
              className='fotografia-img-large'
            />
          ))}
        </div>
          <div className='contenido_fotodetalle'>
            <h3>{capitalizeFirstLetter(fotografia.tipo_bien)}</h3>
            <h4>Ficha catalográfica</h4>
            <p><span id='spanAzul'>Título:</span> <span>{fotografia.titulo}</span></p>
            <p><span id='spanAzul'>Autor:</span> <span>{fotografia.autor}</span></p>
            <p><span id='spanAzul'>Prólogo:</span> <span>{fotografia.prologo}</span></p>
            <p><span id='spanAzul'>Compilador (es):</span> <span>{fotografia.compiladores}</span></p>
            <p><span id='spanAzul'>Editorial:</span> <span>{fotografia.editorial}</span></p>
            <p><span id='spanAzul'>Año de publicación:</span> <span>{fotografia.fecha_publicacion}</span></p>
            <p><span id='spanAzul'>Lugar de edición:</span> <span>{fotografia.lugar_edicion}</span></p>
            <p><span id='spanAzul'>Año de reimpresión	:</span> <span>{fotografia.fehca_reimpresion}</span></p>
            <p><span id='spanAzul'>Volumen:</span> <span>{fotografia.volumen}</span></p>
            <p><span id='spanAzul'>Número de páginas:</span> <span>{fotografia.numero_paginas}</span></p>
            <p><span id='spanAzul'>ISBN:</span> <span>{fotografia.isbn}</span></p>
            <p><span id='spanAzul'>Colección/Serie:</span> <span>{fotografia.coleccion_serie}</span></p>

          </div>
        </div>
      </div>
    </main>
  );
};
