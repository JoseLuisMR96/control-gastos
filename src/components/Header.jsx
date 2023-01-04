import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ 
    gastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setisValidPresupuesto

}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
                <ControlPresupuesto
                gastos={gastos}
                presupuesto={presupuesto}
                />
        ) : (
        <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setisValidPresupuesto={setisValidPresupuesto}
        />)}
        
    </header>
  )
}

export default Header
