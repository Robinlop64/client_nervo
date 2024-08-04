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

  const getNavigationPath = () => {
    const { pais, institucion, tema } = fotografia;
    return (
      <>
        <span onClick={() => navigate(`/pais/${pais}`)}>{pais} /</span> 
        <span onClick={() => navigate(`/institucion/${institucion}`)}>{institucion} /</span> 
        <span onClick={() => navigate(`/admin/fotografias`)}>Fotografias / </span> 
        <span onClick={() => navigate(`/tema/${tema}`)}>{tema}</span>
      </>
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderField = (label, value) => {
    return value ? <p><span>{label}:</span> <span>{value}</span></p> : null;
  }

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
            <img src={imageUrl} alt={fotografia.titulo} className='fotografia-img-large' />
          </div>
          <div className='contenido_fotodetalle'>
            <h3>{capitalizeFirstLetter(fotografia.tipo_bien)}</h3>
            <h4>Ficha catalográfica</h4>
            {renderField("Título", fotografia.titulo)}
            {renderField("Autor", fotografia.autor)}
            {renderField("Fecha", `${fotografia.anio}${fotografia.mes ? `/${fotografia.mes}` : ''}${fotografia.dia ? `/${fotografia.dia}` : ''}`)}
            {renderField("Colección", fotografia.coleccion)}
            {renderField("Álbum", fotografia.numero_album)}
            {renderField("Número de Foto", fotografia.numero_foto)}
            {renderField("Descripción", fotografia.descripcion)}
            {renderField("Ubicación del bien", fotografia.institucion)}
          </div>
        </div>
      </div>
    </main>
  );
}
