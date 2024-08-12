import { useParams, NavLink } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { Api } from '../../../../hooks/Api';
import React, { useEffect, useState } from 'react';

export const EditarCorrespondencia = () => {
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
      const url = `https://backend-prueba-apel.onrender.com/api/correspondencia/icon/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.Corresp);
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

    const { datos, cargando } = await Api("https://backend-prueba-apel.onrender.com/api/correspondencia/editar/" + id, "PUT", nueva_foto);
    if (datos.status == "success") {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      Array.from(fileInput.files).forEach((file, index) => {
        formData.append(`files`, file);
      });
      setSaved("saved");

      const { subida2, cargando2 } = await Api("https://backend-prueba-apel.onrender.com/api/correspondencia/registrar-imagen/" + id, "POST", formData, true);
      const { subida, cargando } = await Api("https://backend-google-fnsu.onrender.com/api/correspondencia/editar-imagen/" + id, "POST", formData, true);

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
              <div className="form-group">
                <label>Título</label>
                <input id='encabezado' type="textarea" name="titulo" placeholder="Título" defaultValue={fotografia.titulo} onChange={cambiado} />
              </div>
              <div className="form-group" id="nombrePeriodico">
                <label htmlFor="nombrePeriodico">Tipo de correspondencia</label>
                <select
                  id="nombrePeriodicoSelect"
                  name="tipo_correspondencia"
                  defaultValue={fotografia.tipo_correspondencia || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.tipo_correspondencia}>{fotografia.tipo_correspondencia}</option>
                  <option value="Carta">Carta</option>
                  <option value="Postal">Postal</option>
                  <option value="Telegrama">Telegrama</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
              <div className="form-group" id="FechaCorrespondencia">
                <label id='fecha_publicacionLabel'>Fecha de envío</label>
                <input
                  type="date"
                  name="fecha_envio"
                  defaultValue={fotografia.fecha_envio || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id="FechaCorrespondencia">
                <label id='fecha_publicacionLabel'>Fecha de recepción</label>
                <input
                  type="date"
                  name="fecha_recepcion"
                  value={fotografia.fecha_recepcion || ''}
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
              <div className="form-group" id='corriente'>
                <label>Remitente:</label>
                <input type="text" className='autor' name="remitente" placeholder="Autor" defaultValue={fotografia.remitente || ''} onChange={cambiado} />
              </div>
              <div className="form-group" id='corriente'>
                <label>Destinatario:</label>
                <input type="text" className='autor' name="destinatario" placeholder="destinatario" defaultValue={fotografia.destinatario || ''} onChange={cambiado} />
              </div>
              <div className="form-group" id='columnas'>
                <label htmlFor="columnas">Origen</label>
                <input
                  type="text"
                  id="columnasInput"
                  name="lugar_origen"
                  placeholder="lugar de origen"
                  defaultValue={fotografia.lugar_origen || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group" id='columnas'>
                <label htmlFor="columnas">Destino</label>
                <input
                  type="text"
                  id="columnasInput"
                  name="lugar_destino"
                  placeholder="lugar de destino"
                  defaultValue={fotografia.lugar_destino || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombreSeudonimos">Medio de envío</label>
                <select
                  id="nombreSeudonimos"
                  name="medio_envio"
                  value={fotografia.medio_envio || ''}
                  onChange={cambiado}
                >
                  <option value={fotografia.medio_envio}>{fotografia.medio_envio} </option>
                  <option value="Correo Postal">Correo Postal</option>
                  <option value="Telégrafo">Telégrafo</option>
                </select>
              </div>
              <div className="form-group" id="columnas">
                <label htmlFor="seccion">Anexos</label>
                <input
                  type="text"
                  id="seccionInput"
                  name="anexos"
                  placeholder="anexos"
                  defaultValue={fotografia.anexos || ''}
                  onChange={cambiado}
                />
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <input id='encabezado' type="textarea" name="asunto" placeholder="" defaultValue={fotografia.asunto || ''} onChange={cambiado} />
              </div>
            </div>
            <div className='divisor_form2'>
              <div className='form-group' id='images'>
                <label htmlFor='file0'>Imagen</label>
                <input type='file' name='file0' id="file" multiple />
              </div>
              <div className='form-group' id='pdf2'>
                <label htmlFor='pdfs'>Pdf</label>
                <input type='file' name='pdfs' id='pdf' multiple />
              </div>
              <div className='divisor_form'>
                <div className="form-group" id="resumen">
                  <label htmlFor="resumen" id='resumenLabel'>Notas</label>
                  <textarea
                    type="text"
                    id="resumenInput"
                    name="notas"
                    placeholder=""
                    defaultValue={fotografia.notas || ''}
                    onChange={cambiado}
                  />
                </div>
                <div className="form-group" id="transcripcion">
                  <label htmlFor="transcripcion" id="transcripcionLabel">Transcripción</label>
                  <textarea
                    type="text"
                    id="transcripcionInput"
                    name="transcripcion"
                    placeholder="Transcripción"
                    defaultValue={fotografia.transcripcion || ''}
                    onChange={cambiado}
                  />
                </div>
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
                <input type='text' name="ubicacion_fisica" defaultValue={fotografia.ubicacion_fisica || ''} onChange={cambiado}>
                </input>
              </div>
              <div className="form-group">
                <label>Colección:</label>
                <input type='text' name="coleccion" defaultValue={fotografia.coleccion || ''} onChange={cambiado}>
        
                </input>
              </div>
              <div className="form-group">
                <label>Año de adquisición:</label>
                <select id='adq' name="fecha_adquisicion" value={fotografia.fecha_adquisicion || ''} onChange={cambiado}>
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
                <select id='hallazgo' name="hallazgo" value={fotografia.hallazgo || ''} onChange={cambiado}>
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </div>
              <div className="form-group">
                <label>Persona que registra:</label>
                <select name="persona_registra" value={fotografia.persona_registra || ''} onChange={cambiado}>
                  <option value="Mayra Fonseca">Mayra Fonseca</option>
                  <option value="Robin">Robin</option>
                  <option value="Xoely">Xoely</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tema:</label>
                <input type='text' name="tema" defaultValue={fotografia.tema || ''} onChange={cambiado}>
                  
                </input>
              </div>
            </div>
            <button className="button" onClick={guardar_foto}>Enviar</button>
            <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
            <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto' : ''}</strong>
          </form>


          <strong id='saved_text'>{saved === 'saved' ? 'Fotografia actualizada correctamente' : ''}</strong>
          <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
          <div className='marco'>

        
            {console.log(fotografia)} {/* Verifica la estructura de fotografia.images */}
            {fotografia.images && fotografia.images.map((image, index) => (
              <img
                key={index}
                src={`https://backend-prueba-apel.onrender.com/imagenes/correspondencia/${image.nombre}`}
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
