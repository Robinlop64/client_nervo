import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AlbumFotos = () => {
  const [fotos, setFotos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFotos();
  }, [id]);

  const getFotos = async () => {
    const url = `https://backend-prueba-apel.onrender.com/api/fotografia/album/${id}`;
    const peticion = await fetch(url, {
      method: "GET"
    });

    let datos = await peticion.json();
    if (datos.status === "success") {
      setFotos(datos.fotos);
    } else {
      // Manejo de error
      console.error('Error fetching photos:', datos.message);
    }
  };
  const handleFotoClick = (fotografia) => {
    navigate(`/fotografias/${fotografia._id}`);
  };


  return (
    <div>
      <main id='main2'>
        <div className='containerfotografia'>
          <h3>Fotografías</h3>
          <button onClick={getFotos}>Mostrar Fotografías</button>
          <div className='fotografias-container'>
            {fotos.map((fotografia) => {
              const imageUrl = `https://backend-prueba-apel.onrender.com/imagenes/fotografias/${fotografia.image}`;
              return (
                <div
                  key={fotografia._id}
                  className='fotografia-item'
                  onClick={() => handleFotoClick(fotografia)}
                >
                  <img src={imageUrl} alt={fotografia.titulo} className='fotografia-img' />
                  <p>{fotografia.titulo}</p>
                  <p>{fotografia.autor}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
