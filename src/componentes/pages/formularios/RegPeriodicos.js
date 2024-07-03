import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegPeriodicos = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
            <Formugeneral/>
            <h3>Campos específicos Publicaciones periódicas</h3>
                <div id="esp1">
                    <label for="nombrePeriodico">Nombre del periódico</label>
                    <input type="text" id="nombrePeriodico" name="nombrePeriodico" placeholder="Nombre del periódico"/>
            
                    <label>Fecha de publicación</label>
                    <label for="dia">Día</label>
                    <input type="text" id="dia" name="dia" placeholder="Día"/>
                    <label for="mes">Mes</label>
                    <input type="text" id="mes" name="mes" placeholder="Mes"/>
                    <label for="anio">Año</label>
                    <input type="text" id="anio" name="anio" placeholder="Año"/>
            
                    <label for="pagina">Página</label>
                    <input type="text" id="pagina" name="pagina" placeholder="Página"/>
            
                    <label for="numeroEdicion">Número de edición</label>
                    <input type="text" id="numeroEdicion" name="numeroEdicion" placeholder="Número de edición"/>
            
                    <label for="numeroPublicacion">Número de publicación</label>
                    <input type="text" id="numeroPublicacion" name="numeroPublicacion" placeholder="Número de publicación"/>
            
                    <label>Género</label>
                    <label for="generoPeriodistico">Periodístico</label>
                    <select id="generoPeriodistico" name="generoPeriodistico">
                        <option value="notas">Notas</option>
                        <option value="articulos">Artículos</option>
                        <option value="cronicas">Crónicas</option>
                    </select>
            
                    <label for="generoLiterario">Literarios</label>
                    <select id="generoLiterario" name="generoLiterario">
                        <option value="poesia">Poesía</option>
                        <option value="cuentos">Cuentos</option>
                        <option value="criticaLiteraria">Crítica literaria</option>
                        <option value="semblanzas">Semblanzas</option>
                    </select>
            
                    <label for="nombreSeudonimos">Nombre o seudónimos</label>
                    <input type="text" id="nombreSeudonimos" name="nombreSeudonimos" placeholder="Nombre o seudónimos"/>
            
                    <label for="encabezado">Encabezado</label>
                    <input type="text" id="encabezado" name="encabezado" placeholder="Encabezado"/>
            
                    <label for="seccion">Sección</label>
                    <input type="text" id="seccion" name="seccion" placeholder="Sección"/>
            
                    <label for="columnas">Columnas</label>
                    <input type="text" id="columnas" name="columnas" placeholder="Columnas"/>
            
                    <label for="colaboradores">Colaboradores</label>
                    <input type="text" id="colaboradores" name="colaboradores" placeholder="Colaboradores"/>
            
                    <label for="tipoPublicacion">Tipo de publicación</label>
                    <input type="text" id="tipoPublicacion" name="tipoPublicacion" placeholder="Tipo de publicación"/>
            
                    <label for="resumen">Resumen</label>
                    <input type="text" id="resumen" name="resumen" placeholder="Resumen"/>
            
                    <label for="transcripcion">Transcripción</label>
                    <input type="text" id="transcripcion" name="transcripcion" placeholder="Transcripción"/>
                </div>
            </div>
        </main>
    </div>
  )
}
