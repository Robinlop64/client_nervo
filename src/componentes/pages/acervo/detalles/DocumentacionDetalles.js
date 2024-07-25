import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const DocumentacionDetalle = () => {
  const { id } = useParams();
  const [fotografia, setFotografia] = useState(null);
  const [pdfNombre, setPdfNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/documentacion/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.docu);
        if (datos.docu.pdf && datos.docu.pdf.length > 0) {
          setPdfNombre(datos.docu.pdf[0].nombre);
        }
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
                src={`https://backend-prueba-apel.onrender.com/imagenes/documentacion/${image.nombre}`}
                alt={`${fotografia.titulo} ${index + 1}`}
                className='fotografia-img-large'
              />
            ))}
          </div>
          <div className='contenido_fotodetalle'>
            <h3>{capitalizeFirstLetter(fotografia.tipo_bien)}</h3>
            <p><span>Título:</span> <span>{fotografia.titulo}</span></p>
            <p><span>Institución emisora:</span> <span>{fotografia.emisor}</span></p>
            <p><span>Fecha de emisión:</span> <span>{fotografia.fecha_emision}</span></p>
            <p><span>Lugar de emisión:</span> <span>{fotografia.lugar_emision}</span></p>
            <p><span>Destinatario:</span> <span>{fotografia.destinatario}</span></p>
            <p><span>Número de expediente/carpeta:</span> <span>{fotografia.numero_expediente}</span></p>
            <p><span>Contenido del documento:</span> <span>{fotografia.contenido}</span></p>
            <p><span>Notas:</span> <span>{fotografia.notas}</span></p>
            
          </div>
          <div className='marco'>
          {fotografia.pdfs[0] && (
              <div className='pdf-viewer'>
                <embed 
                  src={`https://backend-prueba-apel.onrender.com/imagenes/documentacion/pdf/${fotografia.pdfs[0].nombre}`} 
                  width="100%" 
                  height="600px" 
                  type="application/pdf" 
                />
              </div>
            )}
            </div>
        </div>
      </div>
    </main>
  );
};
