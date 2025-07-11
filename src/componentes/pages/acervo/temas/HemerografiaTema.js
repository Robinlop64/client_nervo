import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PeriodicoDetalle } from '../detalles/PeriodicoDetalle';

export const HemerografiaTema = () => {
  const [fotos, setFotos] = useState([]);
  const [nombrePeriodico, setNombrePeriodico] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFotos();
  }, [id]);

  const getFotos = async () => {
    const url = `https://backend-prueba-apel.onrender.com/api/hemerografia/tema/${id}`;
    const peticion = await fetch(url, {
      method: "GET"
    });
    let datos = await peticion.json();
    if (datos.status === "success") {
      setFotos(datos.fotos);
      if (datos.fotos.length > 0) {
        setNombrePeriodico(datos.fotos[0].nombre_periodico);
      }
    } else {
      console.error('Error fetching photos:', datos.message);
    }
  };

  const handleFotoClick = (fotografia) => {
    navigate(`/admin/hemerografia/${fotografia._id}`);
  };

  const handleDeleteClick = async (event, fotografiaId) => {
    event.stopPropagation();
    const url = `https://backend-prueba-apel.onrender.com/api/hemerografia/${fotografiaId}`;
    const peticion = await fetch(url, {
      method: "DELETE"
    });

    let datos = await peticion.json();
    if (datos.status === "success") {
      getFotos();
    } else {
      console.error('Error deleting photo:', datos.message);
    }
  };

  const handleEditClick = (event, fotografiaId) => {
    event.stopPropagation();
    navigate(`/admin/editar/hemerografia/${fotografiaId}`);
  };

  return (
    <main className='main_album'>
      <div className='container_fotografia'>
        <h1>{nombrePeriodico}</h1>
  
        <PeriodicoDetalle />
        <div className='fotografias-container'>
          {fotos.map((fotografia) => {
            const firstImage = fotografia.images && fotografia.images.length > 0 ? fotografia.images[0].nombre : null;
            const imageUrl = firstImage ? `https://backend-prueba-apel.onrender.com/imagenes/hemerografia/${firstImage}` : '';
            const pendiente = fotografia.pendiente; // Verifica si el campo pendiente tiene contenido
            const revisado = fotografia.revisado
            return (
              <div
                key={fotografia._id}
                className={`hemerografia-item ${pendiente && revisado !== 'Sí' ? 'pendiente' : ''}`}
                onClick={() => handleFotoClick(fotografia)}
              >
                {firstImage ? (
                  <img src={imageUrl} className='fotografia-img' alt={`Foto ${fotografia.numero_registro}`} />
                ) : (
                  <p>No hay imagen disponible</p>
                )}
                <p className='numero_foto'>{fotografia.numero_registro}</p>
            
                {pendiente && <p className='pendiente-text'>Pendiente: {pendiente}</p>}
            
                <button onClick={(event) => handleEditClick(event, fotografia._id)}>Editar</button>
                <button onClick={(event) => handleDeleteClick(event, fotografia._id)}>Borrar</button>
              </div>
            );
            
          })}
        </div>
      </div>
    </main>
  );
};
