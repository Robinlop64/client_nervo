import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegCorrespondencia = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
            <Formugeneral/>

            <h3>Campos específicos correspondencia</h3>
                <div id="esp1">
                    <label for="tipoCorrespondencia">Tipo de correspondencia</label>
                    <select id="tipoCorrespondencia" name="tipoCorrespondencia">
                        <option value="carta">Carta</option>
                        <option value="postal">Postal</option>
                        <option value="telegrama">Telegrama</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="otros">Otros</option>
                    </select>
            
                    <label for="remitente">Remitente</label>
                    <input type="text" id="remitente" name="remitente" placeholder="Remitente"/>
            
                    <label for="destinatario">Destinatario</label>
                    <input type="text" id="destinatario" name="destinatario" placeholder="Destinatario"/>
            
                    <label>Fecha de envío</label>
                    <label for="diaEnvio">Día</label>
                    <input type="text" id="diaEnvio" name="diaEnvio" placeholder="Día"/>
                    <label for="mesEnvio">Mes</label>
                    <input type="text" id="mesEnvio" name="mesEnvio" placeholder="Mes"/>
                    <label for="anioEnvio">Año</label>
                    <input type="text" id="anioEnvio" name="anioEnvio" placeholder="Año"/>
            
                    <label>Fecha de recepción</label>
                    <label for="diaRecepcion">Día</label>
                    <input type="text" id="diaRecepcion" name="diaRecepcion" placeholder="Día"/>
                    <label for="mesRecepcion">Mes</label>
                    <input type="text" id="mesRecepcion" name="mesRecepcion" placeholder="Mes"/>
                    <label for="anioRecepcion">Año</label>
                    <input type="text" id="anioRecepcion" name="anioRecepcion" placeholder="Año"/>
            
                    <label for="lugarOrigen">Lugar de origen</label>
                    <input type="text" id="lugarOrigen" name="lugarOrigen" placeholder="Lugar de origen"/>
            
                    <label for="lugarDestino">Lugar de destino</label>
                    <input type="text" id="lugarDestino" name="lugarDestino" placeholder="Lugar de destino"/>
            
                    <label for="medioEnvio">Medio de envío</label>
                    <input type="text" id="medioEnvio" name="medioEnvio" placeholder="Medio de envío"/>
            
                    <label>Técnica de impresión</label>
                    <label for="manuscrito">Manuscrito</label>
                    <input type="radio" id="manuscrito" name="tecnicaImpresion" value="manuscrito"/>
                    <label for="mecanografia">Mecanografía</label>
                    <input type="radio" id="mecanografia" name="tecnicaImpresion" value="mecanografia"/>
            
                    <label for="asunto">Asunto</label>
                    <input type="text" id="asunto" name="asunto" placeholder="Asunto"/>
            
                    <label for="transcripcion">Transcripción</label>
                    <input type="text" id="transcripcion" name="transcripcion" placeholder="Transcripción"/>
            
                    <label for="numeroPaginas">Número de páginas</label>
                    <input type="text" id="numeroPaginas" name="numeroPaginas" placeholder="Número de páginas"/>
            
                    <label for="formato">Formato</label>
                    <input type="text" id="formato" name="formato" placeholder="Formato"/>
            
                    <label for="idioma">Idioma</label>
                    <input type="text" id="idioma" name="idioma" placeholder="Idioma"/>
            
                    <label for="anexos">Anexos (cualquier material adicional incluido con la carta)</label>
                    <input type="text" id="anexos" name="anexos" placeholder="Anexos"/>
            
                    <label for="estadoCarta">Estado de la carta</label>
                    <input type="text" id="estadoCarta" name="estadoCarta" placeholder="Estado de la carta"/>
                    
                </div>
                
            </div>
        </main>
    </div>
  )
}
