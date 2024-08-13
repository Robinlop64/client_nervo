import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { Api } from '../../../../hooks/Api';




export const EditarFotografia = () => {
  const { formulario, enviado, cambiado, resetFormulario, setFormulario } = useForm({})
  const [resultado, setResultado] = useState(false)
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
      const url = `https://backend-prueba-apel.onrender.com/api/fotografia/foto/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        console.log("esto es del fetchtofo",datos.foto)
        setFotografia(datos.foto);
        console.log("tambien es del fech foto:", fotografia.autor)
      } else {
        // Manejo de error
      }
    };
    fetchFoto();
    if (formulario.pais) {
      const ciudades = Object.keys(data[formulario.pais]);
      setCiudades(ciudades);
      setSaved("")
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


  const imageUrl = `https://backend-prueba-apel.onrender.com/imagenes/fotografia/${fotografia.image}`;
  const guardar_foto = async (e) => {
    e.preventDefault();
    let nueva_foto = formulario;

    const { datos, cargando } = await Api("https://backend-prueba-apel.onrender.com/api/fotografia/editar-foto/" + id, "PUT", nueva_foto);
    if (datos.status == "success") {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      Array.from(fileInput.files).forEach((file, index) => {
        formData.append(`files`, file);
      });
      setSaved("saved");

      const { subida2, cargando2 } = await Api("https://backend-prueba-apel.onrender.com/api/fotografia/registrar-imagen/" + id, "POST", formData, true);
      const { subida, cargando } = await Api("https://backend-google-fnsu.onrender.com/api/fotografia/editar-imagen/" + id, "POST", formData, true);

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

          <div>

            <h1>Formulario de registro de bienes </h1>


            <div className='frame_botones_registro' id="regresar_boton">
              <NavLink to="/registro">
                <button className="button">Regresar</button>
              </NavLink>
            </div>
            <form onSubmit={guardar_foto}>
              <h2>Campos generales</h2>

              <div className='divisor_form'>

                <div className="form-group">
                  <label>Título:</label>
                  <input type="textarea" name="titulo" placeholder="Título" defaultValue={fotografia.titulo || ''} onChange={cambiado} />
                </div>

                <div className="form-group" id='autor'>
                  <label>Autor:</label>
                  <input type="text" className='autor' name="autor" placeholder="Autor" defaultValue={fotografia.autor || ''} onChange={cambiado} />
                </div>

                
                

                
              
                <div className="form-group" id='numeroFotografia'>
                  <label>Número de foto:</label>
                  <input type="number" name="numero_foto"  defaultValue={fotografia.numero_foto || ''} onChange={cambiado} />
                </div>
                
                
                <div className="form-group">
                <label>Número de álbum:</label>
                  <select name="numero_album" id="num_album" defaultValue={fotografia.numero_album || ''} onChange={cambiado} >
                  <option value={fotografia.numero_album}>{fotografia.numero_album}</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                  </select>
                </div>
                <div className="form-group" id='fechaFoto'>
                  <label>Fecha:</label>
                  <input type="date" name="fecha" className="small-input" placeholder="Año" defaultValue={fotografia.fecha || ''} onChange={cambiado} />
                  
                </div>

                <div className="form-group">
                  <label>Formato:</label>
                  <input type="text" name="formato" placeholder="Formato" defaultValue={fotografia.formato || ''} onChange={cambiado} />
                </div>

                <div className="form-group">
                  <label>Cámara:</label>
                  <input type="text" name="camara" placeholder="Cámara" defaultValue={fotografia.camara || ''} onChange={cambiado} />
                </div>


                <div className='form-group'>
                <label htmlFor='file0'>Imagen</label>
                <input type='file' name='file0' id="file" multiple />
              </div>
              

                <div className='divisor_form'>
                            <div className="form-group"id="resumen">
                                <label htmlFor="resumen" id='resumenLabel'>Resumen</label>
                                <textarea
                                    type="text"
                                    id="resumenInput"
                                    name="resumen"
                                    placeholder=""
                                    defaultValue={fotografia.resumen || ''}
                                    onChange={cambiado}
                                />
                            </div>

                            <div className="form-group"id="transcripcion">
                                <label htmlFor="transcripcion" id="transcripcionLabel">Pendientes</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendientes"
                                    placeholder="Transcripción"
                                    defaultValue={fotografia.pendientes || ''}
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
                  <select name="ubicacion_fisica" value={fotografia.ubicacion_fisica || ''} onChange={cambiado}>
                    <option value="">Seleccionar ubicación</option>
                    <option value="Biblioteca">Biblioteca</option>
                    <option value="Archivo">Archivo</option>
                    <option value="Museo">Museo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Colección:</label>
                  <input  type='text' name="coleccion" defaultValue={fotografia.coleccion || ''} onChange={cambiado}>
                    
                  </input>
                </div>
               

                
               
                <div className="form-group">
                  <label>Hallazgo:</label>
                  <select id='hallazgo' name="hallazgo" value={fotografia.hallazgo || ''} onChange={cambiado}>
                  <option value={fotografia.hallazgo}>{fotografia.hallazgo}</option>
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
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
                  </select>
                </div>





                

                <div className="form-group">
                  <label>Persona que registra:</label>
                  <select name="persona_registra" defaultValue={fotografia.persona_registra || ''} onChange={cambiado}>
                  <option value={fotografia.persona_registra}>{fotografia.persona_registra}</option>
                    <option value="Mayra Fonseca">Mayra Fonseca</option>
                    <option value="Robin">Robin</option>
                    <option value="Xoely">Xoely</option>
                    <option value="Perla">Perla</option>
                  </select>
                </div>

                <div className="form-group" id='tema'>
                  <label>Tema:</label>
                  <input type='text' name="tema" defaultValue={fotografia.tema || ''} onChange={cambiado}/>
                    
                </div>
              </div>
              <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
            </form>
            {fotografia.images && fotografia.images.map((image, index) => (
              <img
                key={index}
                src={`https://backend-prueba-apel.onrender.com/imagenes/fotografias/${image.nombre}`}
                alt={`${image.nombre}`}
                className='fotografia-img-large'
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
