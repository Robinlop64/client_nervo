import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegIconografia = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
                <Formugeneral/>
                <h3>Campos específicos iconografía</h3>
                
                <div id="esp1">
                    <label for="tipoIconografia">Tipo de iconografía</label>
                    <select id="tipoIconografia" name="tipoIconografia">
                        <option value="dibujo">Dibujo</option>
                        <option value="pintura">Pinturas</option>
                        <option value="grabado">Grabados</option>
                        <option value="cartel">Carteles</option>
                    </select>

                    <label for="medidas">Medidas</label>
                    <input type="text" id="medidas" name="medidas" placeholder="Medidas"/>

                    <label for="tecnica">Técnica</label>
                    <input type="text" id="tecnica" name="tecnica" placeholder="Técnica"/>

                    <label for="superficie">Superficie</label>
                    <select id="superficie" name="superficie">
                        <option value="papel">Papel</option>
                        <option value="otra">Otra</option>
                    </select>

                    <label for="corriente">Corriente</label>
                    <input type="text" id="corriente" name="corriente" placeholder="Corriente"/>

                    <label for="tecnicaImpresion">Técnica de impresión</label>
                    <input type="text" id="tecnicaImpresion" name="tecnicaImpresion" placeholder="Técnica de impresión"/>

                    <label for="idioma">Idioma</label>
                    <input type="text" id="idioma" name="idioma" placeholder="Idioma"/>

                    <label for="descripcionContexto">Descripción del contexto</label>
                    <input type="text" id="descripcionContexto" name="descripcionContexto" placeholder="Descripción del contexto"/>
                    
                </div>
            </div>


        </main>
        

    </div>
  )
}
