import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { Api } from '../../../../hooks/Api';


const data = {
  México: {
    Tepic: [
      "Casa Museo Amado Nervo",
      "Biblioteca Magna de la Universidad Autónoma de Nayarit (UAN)",
      "Hemeroteca de la UAN",
      "Archivo General del Estado de Nayarit",
      "Archivo Histórico de la Diócesis de Tepic",
      "Fototeca Centro INAH Tepic"
    ],
    Compostela: ["Colecciones Particulares"],
    Mazatlán: ["Archivo Histórico Municipal de Mazatlán"],
    Guadalajara: [
      "Biblioteca Pública del Estado de Jalisco “Juan José Arreola”",
      "Colecciones Particulares"
    ],
    Monterrey: [
      "Biblioteca Miguel de Cervantes Saavedra. Tecnológico de Monterrey (ITESM)",
      "Biblioteca Universitaria de la Universidad Autónoma de Nuevo León (UANL)"
    ],
    Pachuca: ["Fototeca Nacional del Instituto Nacional de Antropología e Historia (INAH)"],
    CDMX: [
      "Biblioteca Nacional de México",
      "Hemeroteca Nacional de México",
      "Casa Museo Alfonso Reyes (Capilla Alfonsina)",
      "Archivo Histórico Genaro Estrada. Secretaria de Relaciones Exteriores",
      "Archivo General de la Nación",
      "Colecciones Particulares"
    ]
  },
  España: {
    Madrid: [
      "Biblioteca Nacional de España",
      "Instituto del Patrimonio Cultural de España /Universidad Complutense de Madrid",
      "Ateneo de Madrid",
      "Biblioteca Octavio Paz. Instituto de México en España",
      "Archivo Histórico Nacional",
      "Real Academia Española",
      "Registro Civil de Madrid",
      "Cementerio Sacramental San Lorenzo y San José",
      "Hemeroteca Municipal del Ayuntamiento de Madrid",
      "Archivo General de Palacio"
    ],
    Barcelona: ["Archivo Histórico Fotográfico"]
  },
  Francia: {
    París: [
      "Embajada de México en Francia",
      "Mairie De París Du 14",
      "Archivo de París",
      "Instituto Cultural México en Francia",
      "Biblioteca Nacional de Francia"
    ]
  },
  Portugal: {
    Lisboa: [
      "Embajada de México en Portugal",
      "Archivo Diplomático del Ministerio de Negocios Extranjeros en Portugal",
      "Torre Do Tombo de la Universidad de Portugal",
      "Biblioteca Nacional de Portugal",
      "Hemeroteca Municipal de Lisboa"
    ]
  },
  Argentina: {
    Buenos_Aires: [
      "Biblioteca de la Legislatura Portuaria",
      "Biblioteca del Congreso de la Nación",
      "Biblioteca Nacional Mariano Moreno",
      "Embajada de México en Argentina",
      "Archivo Ministerio de Relaciones Exteriores, cancillería Argentina",
      "Archivo General de la Nación",
      "Jardín del Rosedal"
    ]
  },
  Uruguay: {
    Montevideo: [
      "Palacio Santos- Ministerio de Relaciones Exteriores, Instituto Artiga",
      "Archivo General de la Nación",
      "Biblioteca Nacional de Uruguay",
      "Archivo Nacional de la Imagen y la Palabra",
      "Museo Naval",
      "Parque Hotel. Merco-sur",
      "Ateneo de Montevideo",
      "Biblioteca Amado Nervo",
      "Cementerio Central",
      "Centro de Estudios Históricos Navales y Marítimos",
      "Palacio Legislativo",
      "Calle Amado Nervo",
      "Universidad de la República de Uruguay",
      "Museo Zorrilla",
      "Busto-monumento Amado Nervo"
    ]
  },

  Brasil: {
    "Rio de Janeiro": ["NA"]
  }
};


export const EditarFotografia = () => {
  const { formulario, enviado, cambiado, resetFormulario, setFormulario } = useForm({})
  const [resultado, setResultado] = useState(false)
  const [fileName, setFileName] = useState('');
  const [paises, setPaises] = useState(Object.keys(data));
  const [ciudades, setCiudades] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [saved, setSaved] = useState('not sended');
  const { id } = useParams();
  const [fotografia, setFotografia] = useState({});

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


  const imageUrl = `https://backend-prueba-apel.onrender.com/imagenes/fotografias/${fotografia.image}`;
  const guardar_foto = async (e) => {
    e.preventDefault()
    
    let nueva_foto = formulario;
    console.log("datos formulario es si recoje con el useform", nueva_foto)

    const { datos, cargando } = await Api("https://backend-prueba-apel.onrender.com/api/fotografia/editar-foto/" + id, "PUT", nueva_foto)
    console.log(id)
    if (datos.status == "success") {
      const fileInput = document.querySelector("#file")
      console.log("Si llegaste aqui es pq success")
      console.log("si se recoje el archivo", fileInput.files)
      setSaved("saved")
      const formData = new FormData
      formData.append("file0", fileInput.files[0])

      const { subida2, cargando2 } = await Api("https://backend-prueba-apel.onrender.com/api/fotografia/registrar-imagen/" + id, "POST", formData, true)

      const { subida3, cargando3 } = await Api("https://backend-google-fnsu.onrender.com/api/fotografia/editar-foto/" + id, "PUT",nueva_foto)
      const { subida, cargando } = await Api("https://backend-google-fnsu.onrender.com/api/fotografia/registrar-imagen/" + id, "POST", formData, true)
      
      console.log("Datos de subida3")
      console.log(subida)


      setResultado(true)
      setSaved("saved")

    } else {
      setSaved("error")
    }
    console.log(datos)
    

  }



  return (
    <div>
      <main className='main_registro'>
        <div className='contenedor_formulario_foto'>

          <div>

            <h1>Formulario de Edición de bienes de {fotografia.titulo} </h1>


            <div className='frame_botones_registro' id="regresar_boton">
            <NavLink to={`/admin/album/${fotografia.numero_album}`}>
                <button className="button">Regresar</button>
              </NavLink>
            </div>
            <form onSubmit={guardar_foto}>
              <h2>Campos generales</h2>

              <div className='divisor_form'>

                <div className="form-group">
                  <label>Título:</label>
                  <input type="textarea" name="titulo" placeholder="Título" defaultValue={fotografia.titulo || ""} onChange={cambiado} />
                </div>

                <div className="form-group" id='autor'>
                  <label>Autor:</label>
                  <input type="text" className='autor' name="autor" placeholder="Autor" defaultValue={fotografia.autor || ''} onChange={cambiado} />
                </div>

                <div className="form-group">
                  <label>País:</label>
                  <select
                    id="pais"
                    name='pais'
                    defaultValue={fotografia.pais || ''}
                    onChange={cambiado}>

                    <option value="">Seleccionar país</option>
                    {paises.map((pais) => (
                      <option key={pais} name="paises" defaultValue={pais}>
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
                    <option value="">Seleccionar ciudad</option>
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
                    <option value="">Seleccionar institución</option>
                    {instituciones.map((institucion, index) => (
                      <option key={index} defaultValue={institucion}>
                        {institucion}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="form-group">
                  <label>Ubicación física:</label>
                  <select name="ubicacion_fisica" defaultValue={fotografia.ubicacion_fisica || ''} onChange={cambiado}>
                    <option value="">Seleccionar ubicación</option>
                    <option value="Biblioteca">Biblioteca</option>
                    <option value="Archivo">Archivo</option>
                    <option value="Museo">Museo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Colección:</label>
                  <select name="coleccion" defaultValue={fotografia.coleccion || ''} onChange={cambiado}>
                    <option value="">Seleccionar la colección</option>
                    <option value="Privada">Privada</option>
                    <option value="Creación">Pública</option>
                  </select>
                </div>
                <div className="form-group" id='fecha'>
                  <label>Fecha:</label>
                  <input type="number" name="anio" className="small-input" placeholder="Año" defaultValue={fotografia.anio || ''} onChange={cambiado} />
                  <input type="number" name="mes" className="small-input" placeholder="Mes" defaultValue={fotografia.mes || ''} onChange={cambiado} />
                  <input type="number" name="dia" className="small-input" placeholder="Día" defaultValue={fotografia.dia || ''} onChange={cambiado} />
                </div>




                <div className="form-group">
                  <label>Año de adquisición:</label>
                  <select id='adq' name="fecha_adquisicion" defaultValue={fotografia.fecha_adquisicion || ''} onChange={cambiado} >
                    <option value="">Seleccionar año</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                  </select>
                </div>





                <div className="form-group">
                  <label>Hallazgo:</label>
                  <select id='hallazgo' name="hallazgo" defaultValue={fotografia.hallazgo || ''} onChange={cambiado}>
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Persona que registra:</label>
                  <select name="persona_registra" defaultValue={fotografia.persona_registra || ''} onChange={cambiado}>
                    <option value="Mayra Fonseca">Mayra Fonseca</option>
                    <option value="Robin">Robin</option>
                    <option value="Xoely">Xoely</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tema:</label>
                  <select name="tema" defaultValue={fotografia.tema || ''} onChange={cambiado}>
                    <option value="dw">Seleccionar el tema</option>
                    <option value="Repatriación de los restos de Amado Nervo">Repatriación de los restos de Amado Nervo</option>
                  </select>
                </div>



                <div className='form-group'>
                  <label htmlFor='file0'>Imagen</label>
                  <div className='marco'>
                    <img src={imageUrl} alt={fotografia.titulo} className='fotografia-img-large' />
                  </div>
                  <input type='file' name='file0' id="file" />
                </div>
              </div>


              <h3>Campos específicos Fotografía</h3>
              <div className='campos_fotografia' >
                <div className="form-group">
                  <label>Número de foto:</label>
                  <input type="number" name="numero_foto" defaultValue={fotografia.numero_foto || ''} onChange={cambiado} />
                </div>


                <div className="form-group">
                  <label>Número de álbum:</label>
                  <select name="numero_album" id="num_album" defaultValue={fotografia.numero_album || ''} onChange={cambiado} >
                    <option value="">Número de álbum</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>

                  </select>
                </div>

                <div className="form-group">
                  <label>Formato:</label>
                  <input type="text" name="formato" placeholder="Formato" defaultValue={fotografia.formato || ''} onChange={cambiado} />
                </div>

                <div className="form-group">
                  <label>Cámara:</label>
                  <input type="text" name="camara" placeholder="Cámara" defaultValue={fotografia.camara || ''} onChange={cambiado} />
                </div>

                <div className="form-group">
                  <label id='descripcion_label'>Descripción:</label>
                  <textarea name="descripcion" placeholder="Descripción" defaultValue={fotografia.descripcion || ''} onChange={cambiado} />
                </div>
              </div>
              <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
            </form>
          </div>

        </div>
      </main>
    </div>
  )
}
