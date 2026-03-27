import Fecth from "../services/Fetch";
import { useState } from "react";


function FeedbackForm() {
    
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const enviarReporte = async () => {
        if (!correo || !mensaje) {
            console.log("Todos los campos deben estar llenos");
            return;
        }

    const objReporte = {
      correo: correo,
      mensaje: mensaje
    }
    const reportes = await fetch.postReportes(objReporte);
    console.log(reportes);
    }

    return (
        <div>
            <h1>Feedback</h1>
            <p>Si tienes alguna consulta o quieres reportar algún error o sugerencia no dudes en contactarnos:D.</p>
            <label htmlFor="">Correo</label>
            <input type="text" value={correo} placeholder="Escriba su correo" 
            onChange={(e) => setCorreo(e.target.value)}/>
            <label htmlFor="">Mensaje</label>
            <input type="text" value={mensaje} placeholder="Escriba su reporte;)" 
            onChange={(e) => setMensaje(e.target.value)}/>

            <button onClick={enviarReporte}>Enviar</button>
        </div>
    )
}

export default FeedbackForm;