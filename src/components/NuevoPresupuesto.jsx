import React, { useState } from 'react'
import Mensaje from './Mensaje';


const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setisValidPresupuesto

}) => {

    const [mensajes, setMensaje ]= useState('');
    
    const handlePresupuesto = (e) =>{
        e.preventDefault();

        if(!presupuesto || presupuesto < 0)
        {
            setMensaje('No es presupuesto valido');
            return
        }
        setMensaje('')
        setisValidPresupuesto(true)

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handlePresupuesto} action="" className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input type="number" className='nuevo-presupuesto' placeholder='Añade tu presupuesto' 
                    value={presupuesto}
                    onChange={ e => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value="Añadir" />

            {mensajes && <Mensaje tipo="error">{mensajes}</Mensaje>}
       </form>
    </div>
  )
}

export default NuevoPresupuesto
