import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const HemerografiaDetalle = () => {
  const { id } = useParams();
  const [fotografia, setFotografia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/hemerografia/hemero/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.hemero);
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
        <div className='marco_hemerografia'>
          {console.log(fotografia)} {/* Verifica la estructura de fotografia.images */}
          {fotografia.images && fotografia.images.map((image, index) => (
            <img
              key={index}
              src={`https://backend-prueba-apel.onrender.com/imagenes/hemerografia/${image.nombre}`}
              alt={`${fotografia.titulo} ${index + 1}`}
              className='fotografia-img-large'
            />
          ))}
        </div>
          <div className='contenido_hemerografiaDetalle'>
            <h3>{capitalizeFirstLetter(fotografia.tipo_bien)}</h3>
            <h4>Ficha catalográfica</h4>
            <p><span>Título:</span> <span>{fotografia.encabezado}</span></p>
            <p><span>Autor:</span> <span>{fotografia.autor}</span></p>
            <p><span>Fecha:</span> <span>{fotografia.fecha_publicacion}</span></p>
            <p><span>Colección:</span> <span>{fotografia.coleccion}</span></p>
            <p><span>Numero Edicion:</span> <span>{fotografia.numero_edicion}</span></p>
            <p><span>Número de Foto:</span> <span>{fotografia.numero_foto}</span></p>
            <p><span>Descripción:</span> <span>{fotografia.descripcion}</span></p>
            <p><span>Ubicación del bien:</span> <span>{fotografia.institucion}</span></p>
          </div>
        </div>
      </div>
    </main>
  );
};
