import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegPartituras = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">   
            <Formugeneral/>

            <h3>Campos específicos partituras</h3>
                <div id="esp1">
                    <label for="instrumentacion">Instrumentación</label>
                    <input type="text" id="instrumentacion" name="instrumentacion" placeholder="Instrumentación"/>
            
                    <label for="genero">Género</label>
                    <input type="text" id="genero" name="genero" placeholder="Género"/>
            
                    <label for="duracion">Duración</label>
                    <input type="text" id="duracion" name="duracion" placeholder="Duración"/>
            
                    <label for="claveMusical">Clave musical</label>
                    <input type="text" id="claveMusical" name="claveMusical" placeholder="Clave musical"/>
            
                    <label for="numeroPaginas">Número de páginas</label>
                    <input type="text" id="numeroPaginas" name="numeroPaginas" placeholder="Número de páginas"/>
            
                    <label for="editorial">Editorial</label>
                    <input type="text" id="editorial" name="editorial" placeholder="Editorial"/>
            
                    <label>Fecha de publicación</label>
                    <label for="diaPublicacion">Día</label>
                    <input type="text" id="diaPublicacion" name="diaPublicacion" placeholder="Día"/>
                    <label for="mesPublicacion">Mes</label>
                    <input type="text" id="mesPublicacion" name="mesPublicacion" placeholder="Mes"/>
                    <label for="anioPublicacion">Año</label>
                    <input type="text" id="anioPublicacion" name="anioPublicacion" placeholder="Año"/>
            
                    <label for="formato">Formato</label>
                    <input type="text" id="formato" name="formato" placeholder="Formato"/>
            
                    <label for="audio">Audio</label>
                    <input type="file" id="audio" name="audio"/>
                </div>
            </div>  
        </main>
    </div>
  )
}
