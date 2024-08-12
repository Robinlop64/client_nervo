import { useParams, NavLink } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { Api } from '../../../../hooks/Api';
import React, { useEffect, useState } from 'react';

export const EditarObjetos = () => {
  const { formulario, enviado, cambiado, resetFormulario, setFormulario } = useForm({});
  const [resultado, setResultado] = useState(false);
  const [fileName, setFileName] = useState('');
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [saved, setSaved] = useState('not sended');
  const { id } = useParams();
  const [fotografia, setFotografia] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/instituciones/listar/todo`;
      try {
        const response = await fetch(url, {
          method: "GET"
        });
        const result = await response.json();
        if (result.status === "success") {
          setData(result.data);
          setPaises(Object.keys(result.data));
        } else {
          // Manejo de error
          console.error("Error al obtener los datos", result.message);
        }
      } catch (error) {
        console.error("Error al realizar la petición", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchFoto = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/objetos/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.obj);
      } else {
        // Manejo de error
      }
    };
    fetchFoto();
    if (formulario.pais) {
      const ciudades = Object.keys(data[formulario.pais]);
      setCiudades(ciudades);
      setSaved("");
      if (ciudades.length === 1) {
        setSelectedCiudad(ciudades[0]);
      } else {
        setSelectedCiudad('');
        setInstituciones([]);
      }
    }
  }, [formulario.pais, id]);

  useEffect(() => {
    if (formulario.ciudad && formulario.pais) {
      const instituciones = data[formulario.pais][formulario.ciudad];
      setInstituciones(instituciones);
    }
  }, [formulario.ciudad]);

  const guardar_foto = async (e) => {
    e.preventDefault();
    let nueva_foto = formulario;

    const { datos, cargando } = await Api("https://backend-prueba-apel.onrender.com/api/objetos/editar/" + id, "PUT", nueva_foto);
    if (datos.status == "success") {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      Array.from(fileInput.files).forEach((file, index) => {
        formData.append(`files`, file);
      });
      setSaved("saved");

      const { subida2, cargando2 } = await Api("https://backend-prueba-apel.onrender.com/api/objetos/registrar-imagen/" + id, "POST", formData, true);
      const { subida, cargando } = await Api("https://backend-google-fnsu.onrender.com/api/objetos/editar-imagen/" + id, "POST", formData, true);

      setResultado(true);
      setSaved("saved");
    } else {
      setSaved("error");
    }
  }

  return (
    <div>
      <main className='main_registro'>
        <div className='contenedor_formulario_foto'>
          <h1>Formulario de registro de bienes</h1>
          <div className='frame_botones_registro' id="regresar_boton">
            <NavLink to="/registro">
              <button className="button">Regresar</button>
            </NavLink>
          </div>
          <form onSubmit={guardar_foto}>
            <h2>Campos generales</h2>
            <div className='divisor_form'>
              <div className="form-group" id="nombrePeriodico">
                <label htmlFor="nombrePeriodico">Periódico</label>
                <select
                  id="nombrePeriodicoSelect"
                  name="nombre_periodico"
                  defaultValue={fotografia.nombre_periodico}
                  onChange={cambiado}
                >
                  <option value={fotografia.nombre_periodico}>{fotografia.nombre_periodico}</option>
                  <option value="El Nacional">El Nacional</option>
                </select>
              </div>
              <div className="form-group" id="numeroEdicion">
                <label htmlFor="numeroEdicion">Número de edición</label>
                <input
                  type="number"
                  id="numeroEdicionInput"
                  name="numero_edicion"
                  defaultValue={fotografia.numero_edicion}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id="FechaPublicacion">
                <label id='fecha_publicacionLabel'>Fecha de publicación</label>
                <input
                  type="date"
                  name="fecha_publicacion"
                  defaultValue={fotografia.fecha_publicacion}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id="numeroEdicion">
                <label htmlFor="numeroEdicion">Número de registro</label>
                <input
                  type="number"
                  id="numeroEdicionInput"
                  name="numero_registro"
                  defaultValue={fotografia.numero_registro || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group">
                <label>Encabezado</label>
                <input id='encabezado' type="textarea" name="encabezado" placeholder="Título" defaultValue={fotografia.encabezado || ''} onChange={cambiado} />
              </div>
              <div className="form-group" id='autor'>
                <label>Autor:</label>
                <input type="text" className='autor' name="autor" placeholder="Autor" defaultValue={fotografia.autor || ''} onChange={cambiado} />
              </div>
              <div className="form-group">
                <label htmlFor="nombreSeudonimos">Seudónimo</label>
                <select
                  id="nombreSeudonimos"
                  name="seudonimos"
                  defaultValue={fotografia.seudonimos || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.seudonimos}>{fotografia.seudonimos}</option>
                  <option value="Amado Nervo">Amado Nervo</option>
                  <option value="Román">Román</option>
                  <option value="Rip-Rip">Rip-Rip</option>
                  <option value="Tricio">Tricio</option>
                  <option value="Benedictus">Benedictus</option>
                  <option value="Joie">Joie</option>
                  <option value="Versión española de Amado Nervo">Versión española de Amado Nervo</option>
                  <option value="X.Y.Z">X.Y.Z</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sección</label>
                <select
                  id="generoPeriodistico"
                  name="seccion"
                  value={formulario.seccion || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.seccion}>{fotografia.seccion}</option>
                  <option value="">Seleccionar sección</option>
                  <option value="Fuegos Fatuos">Fuegos Fatuos</option>
                  <option value="Pimientos dulces">Pimietos dulces</option>
                  <option value="Página literaria">Página literaria</option>
                  <option value="Literatura">Literatura</option>
                  <option value="Actualidades europeas">Actualidades europeas</option>
                  <option value="Asuntos femeninos">Asuntos femeninos</option>
                  <option value="Actualidades literarias">Actualidades literarias</option>
                  <option value="Actualidades madrileñas">Actualidades madrileñas</option>
                  <option value="La varita de la virtud">La varita de la virtud</option>
                  <option value="Desde parís">Desde parís</option>
                  <option value="Desde Madrid">Desde Madrid</option>                      

                  <option value="Actualidades">Actualidades</option>
                  <option value="Actualidades españolas">Actualidades españolas</option>
                  <option value="Plaso ibañes">Plaso ibañes</option>
                  <option value="El Imparcial">"El Imparcial"</option>
                  <option value="De Amado Nervo">De Amado Nervo</option>
                  <option value="La literatura maravillosa">La literatura maravillosa</option>
                  <option value="Crónicas frívolas">Crónicas frívolas</option>
                  <option value="Literatura nacional">Literatura nacional</option>
                  <option value="NA">NA</option>

                </select>
              </div>
            </div>
            <div className='divisor_form2'>
              <div className="form-group" id='pagina'>
                <label htmlFor="pagina">Página(s)</label>
                <input
                  type="text"
                  id="paginaInput"
                  name="numero_paginas"
                  placeholder="Página"
                  defaultValue={fotografia.numero_paginas}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id='columnas' >
                <label htmlFor="columnas">Columnas</label>
                <input
                  type="text"
                  id="columnasInput"
                  name="columnas"
                  placeholder="Columnas"
                  defaultValue={fotografia.columnas || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group">
                <label>Género periodístico</label>
                <select
                  id="generoPeriodistico"
                  name="genero_periodistico"
                  defaultValue={fotografia.genero_periodistico || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.genero_periodistico}>{fotografia.genero_periodistico}</option>
                  <option value="">Seleccionar género</option>
                  <option value="notas">Notas</option>
                  <option value="articulos">Artículos</option>
                  <option value="cronicas">Crónicas</option>
                  <option value="frases">Frases</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              <div className="form-group" id="lugarPublicacion">
                <label htmlFor="encabezado">Lugar de publicación</label>
                <input
                  type="text"
                  id="lugarPublicacionInput"
                  name="lugar_publicacion"
                  placeholder="Lugar de publicación"
                  defaultValue={fotografia.lugar_publicacion || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id="periodicidad">
                <label htmlFor="tipoPublicacion">Periodicidad</label>
                <select
                  type="text"
                  id="periodicidadInput"
                  name="periodicidad"
                  placeholder="Tipo de publicación"
                  defaultValue={fotografia.periodicidad || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.periodicidad}>{fotografia.periodicidad}</option>
                  <option value="Diaria">Diaria</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='file0'>Imagen</label>
                <input type='file' name='file0' id="file" multiple />
              </div>
              <div className="form-group" id="resumen">
                <label htmlFor="resumen" id='resumenLabel'>Resumen</label>
                <textarea
                  type="text"
                  id="resumenInput"
                  name="resumen"
                  placeholder="Resumen"
                  defaultValue={fotografia.resumen || ''}
                  onChange={cambiado}
                />
              </div>

              <div className="form-group" id="transcripcion">
                <label htmlFor="transcripcion" id="transcripcionLabel">Pendientes</label>
                <textarea
                  type="text"
                  id="transcripcionInput"
                  name="pendiente"
                  placeholder=""
                  defaultValue={fotografia.pendiente || ''}
                  onChange={cambiado}
                />
              </div>


              <div className="form-group">
                <label>País:</label>
                <select
                  id="pais"
                  name='pais'
                  defaultValue={fotografia.pais || ''}
                  onChange={cambiado}>

                  <option value={fotografia.pais}>{fotografia.pais}</option>
                  {paises.map((pais) => (
                    <option key={pais} name="paises" value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Ciudad:</label>
                <select
                  id="ciudad"
                  name="ciudad"
                  defaultValue={fotografia.ciudad || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.ciudad}>{fotografia.ciudad}</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Institución:</label>
                <select id="institucion" name='institucion' defaultValue={fotografia.institucion || ""} onChange={cambiado}>
                  <option value={fotografia.institucion}>{fotografia.institucion}</option>
                  {instituciones.map((institucion, index) => (
                    <option key={index} value={institucion}>
                      {institucion}
                    </option>
                  ))}
                </select>
              </div>


              <div className="form-group">
                <label>Ubicación física:</label>
                <select name="ubicacion_fisica" defaultValue={fotografia.ubicacion_fisica || ''} onChange={cambiado}>
                  <option value={fotografia.ubicacion_fisica}>{fotografia.ubicacion_fisica}</option>
                  <option value="Biblioteca">Biblioteca</option>
                  <option value="Archivo">Archivo</option>
                  <option value="Museo">Museo</option>
                  <option value="Fondo reservado">Fondo reservado</option>
                </select>
              </div>
              <div className="form-group">
                <label>Colección:</label>
                <select name="coleccion" defaultValue={fotografia.coleccion || ''} onChange={cambiado}>
                  <option value={fotografia.coleccion}>{fotografia.coleccion}</option>
                  <option value="Privada">Privada</option>
                  <option value="Pública">Pública</option>
                </select>
              </div>





              <div className="form-group">
                <label>Año de adquisición:</label>
                <select id='adq' name="fecha_adquisicion" defaultValue={fotografia.fecha_adquisicion || ''} onChange={cambiado} >
                  <option value={fotografia.fecha_adquisicion}>{fotografia.fecha_adquisicion}</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>

                </select>
              </div>





              <div className="form-group">
                <label>Hallazgo:</label>
                <select id='hallazgo' name="hallazgo" defaultValue={fotografia.hallazgo || ''} onChange={cambiado}>
                  <option value={fotografia.hallazgo}>{fotografia.hallazgo}</option>
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label>Persona que registra:</label>
                <select name="persona_registra" defaultValue={fotografia.persona_registra || ''} onChange={cambiado}>
                  <option value={fotografia.persona_registra}>{fotografia.persona_registra}</option>
                  <option value="Mayra Fonseca">Mayra</option>
                  <option value="Robin">Robin</option>
                  <option value="Xoely">Xoely</option>
                  <option value="Perla">Perla</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tema:</label>
                <select name="tema" defaultValue={fotografia.tema || ''} onChange={cambiado}>
                  <option value={fotografia.tema}>{fotografia.tema}</option>
                  <option value="1"> tema 1</option>
                  <option value="2"> tema 2 </option>
                  <option value="El Nacional"> El Nacional </option>
                  <option value="Repatriación de los restos de Amado Nervo">Repatriación de los restos de Amado Nervo</option>
                </select>
              </div>

            </div>

          </form>
          <button className="button" onClick={guardar_foto}>Enviar</button>
          <strong id='saved_text'>{saved === 'saved' ? 'Fotografia actualizada correctamente' : ''}</strong>
          <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
          <div className='marco'>

            <div className='datos anteriores'>
              <p>Encabezado: {fotografia.titulo}</p>
              <p>Numero edición: {fotografia.num_edicion}</p>
              <p>Paginas: {fotografia.num_paginas}</p>
              <p>Encabezado: {fotografia.titulo}</p>
              <p>Lugar de publicación: {fotografia.encabezado}</p>
              <p>Fecha de publicación: {fotografia.dia2} - {fotografia.mes2} - {fotografia.anio2}</p>
              <p>Periodicidad: {fotografia.tipo_publicacion}</p>
            </div>
            {console.log(fotografia)} {/* Verifica la estructura de fotografia.images */}
            {fotografia.images && fotografia.images.map((image, index) => (
              <img
                key={index}
                src={`https://backend-prueba-apel.onrender.com/imagenes/objetos/${image.nombre}`}
                alt={`${image.nombre}`}
                className='fotografia-img-large'
              />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};
