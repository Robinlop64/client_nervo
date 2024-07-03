import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const FotoDetalle = () => {
  const { id } = useParams();
  const [fotografia, setFotografia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/fotografia/foto/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.foto);
      } else {
        // Manejo de error
      }
    };

    fetchFoto();
  }, [id]);

  if (!fotografia) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://backend-prueba-apel.onrender.com/imagenes/fotografias/${fotografia.image}`;

  return (
    <main className="main_fotodetalle">
      <div className="container_fotodetalle">
        <button onClick={() => navigate(-1)}>Regresar</button>
        <div className='barra_fotodetalle'>
          <h2>{fotografia.tema}</h2>
          <h2> {fotografia.tipo_bien}</h2>
        </div>
        <div className='marco'>
        <img src={imageUrl} alt={fotografia.titulo} className='fotografia-img-large' />
        </div>


        <div className='contenido_fotodetalle'>
        <p>Título: {fotografia.titulo}</p>
        <p>Autor: {fotografia.autor}</p>
        <p>Fecha: {fotografia.anio}/{fotografia.mes}/{fotografia.dia}</p>
        <p>Colección: {fotografia.coleccion}</p>
        
        <p>Álbum: {fotografia.numero_album}</p>
        <p>Número de Foto: {fotografia.numero_foto}</p>
        
        <p>Descripción: {fotografia.descripcion}</p>
        <p>Ubicación del bien: {fotografia.institucion}</p>
        </div>
      </div>
    </main>
  );
}
