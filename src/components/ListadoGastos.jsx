import Gasto from "./Gasto"

const ListadoGastos = ({gastos,setGastoEditar,eliminarGasto,filtro,gastosFiltradoss}) => {
  return (
    <div className="listado-gastos contenedor">
        {
          filtro ? (
            <>
              <h2>{gastosFiltradoss.length ? 'Gastos' : 'No hay gastos'}</h2>
              {  
                  gastosFiltradoss.map(gasto => (
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />
                )) 
              }
            </>
        ) : 
            <>
              <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2> 
              {  
                  gastos.map(gasto => (
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />    
                ))
              }
            </>
        }
    </div>
  )
}

export default ListadoGastos
