import { useParams, NavLink } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { Api } from '../../../../hooks/Api';
import React, { useEffect, useState } from 'react';
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

export const EditarIconografia = () => {
  const { formulario, enviado, cambiado, resetFormulario, setFormulario } = useForm({});
  const [resultado, setResultado] = useState(false);
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
      const url = `https://backend-prueba-apel.onrender.com/api/iconografia/icon/${id}`;
      const peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();
      if (datos.status === "success") {
        setFotografia(datos.icon);
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

    const { datos, cargando } = await Api("https://backend-prueba-apel.onrender.com/api/iconografia/editar/" + id, "PUT", nueva_foto);
    if (datos.status == "success") {
        const fileInput = document.querySelector("#file");
        const formData = new FormData();
        Array.from(fileInput.files).forEach((file, index) => {
            formData.append(`files`, file);
        });
      setSaved("saved");

      const { subida2, cargando2 } = await Api("https://backend-prueba-apel.onrender.com/api/iconografia/registrar-imagen/" + id, "POST", formData, true);
      const { subida3, cargando3 } = await Api("https://backend-google-fnsu.onrender.com/api/iconografia/editar/" + id, "PUT", nueva_foto);
      const { subida, cargando } = await Api("https://backend-google-fnsu.onrender.com/api/iconografia/registrar-imagen/" + id, "POST", formData, true);

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
                                <label htmlFor="nombrePeriodico">Tipo de Iconografia</label>
                                <select
                                    id="nombrePeriodicoSelect"
                                    name="tipo_iconografia"
                                    defaultValue={formulario.tipo_iconografia || ''}
                                    onChange={cambiado}
                                >
                                    <option value={fotografia.tipo_iconografia}>{fotografia.tipo_iconografia}</option>
                                    <option value="Dibujo">Dibujo</option>
                                    <option value="Pintura">Pintura</option>
                                    <option value="Grabados">Grabados</option>
                                    <option value="Carteles">Carteles</option>
                                    
                                </select>


                            </div>
                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">Dimenciones</label>
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    name="ancho"
                                    placeholder='ancho'
                                    defaultValue={fotografia.ancho}
                                    onChange={cambiado}
                                />
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    placeholder='alto'
                                    name="alto"
                                    defaultValue={fotografia.alto}
                                    onChange={cambiado}
                                />
                            </div>
                        
                            <div className="form-group" id="FechaPublicacion">
                            <label id='fecha_publicacionLabel'>Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                defaultValue={fotografia.fecha}
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
                                <label>Título</label>
                                <input id='encabezado' type="textarea" name="titulo" placeholder="Título" defaultValue={fotografia.titulo|| ''} onChange={cambiado} />
                            </div>

                            <div className="form-group" id='autor'>
                                <label>Autor:</label>
                                <input type="text" className='autor' name="autor" placeholder="Autor" defaultValue={fotografia.autor || ''} onChange={cambiado} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreSeudonimos">Técnica</label>
                                <input
                                    type='text'
                                    id="nombreSeudonimos"
                                    name="tecnica"
                                    defaultValue={fotografia.tecnica || ''}
                                    onChange={cambiado}
                                >
                                </input>
                            </div>
                            <div className="form-group" id="columnas">
                                <label htmlFor="seccion">Corriente</label>
                                <input
                                    type="text"
                                    id="seccionInput"
                                    name="corriente"
                                    placeholder="Corriente artística"
                                    defaultValue={fotografia.corriente || ''}
                                    onChange={cambiado}
                                />
                            </div>
                        </div>
                            <div className='divisor_form2'>
                           
                            
                            
                            <div className="form-group" id='columnas' >
                                <label htmlFor="columnas">Materiales</label>
                                <input
                                    type="text"
                                    id="columnasInput"
                                    name="superficie"
                                    placeholder="superficie"
                                    defaultValue={fotografia.superficie || ''}
                                    onChange={cambiado}
                                />
                            </div>
                         
                            
                            <div className='form-group'>
                                <label htmlFor='file0'>Imagen</label>
                                <input type='file' name='file0' id="file" multiple/>
                            </div>
                            <div className='divisor_form'>
                            <div className="form-group"id="resumen">
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

                            <div className="form-group"id="transcripcion">
                                <label htmlFor="transcripcion" id="transcripcionLabel">Pendientes</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendientes"
                                    placeholder=""
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
                                <input type='text' id='adq' name="fecha_adquisicion" defaultValue={fotografia.fecha_adquisicion || ''} onChange={cambiado} >
                                    
                                </input>
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
                                <input type='text' name="tema" defaultValue={fotografia.tema || ''} onChange={cambiado}>
                            
                                </input>
                            </div>                       
                            </div>
                        <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
                    </form>
          <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
              <div className='marco'>
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
        </div>
      </main>
      
    </div>
  );
};
