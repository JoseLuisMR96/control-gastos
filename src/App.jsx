
import { useEffect, useState } from "react";
import Filtro from "./components/Filtro";
import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal"; 

import { generarId } from "./helpers";



import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] );

  const [presupuesto, setPresupuesto] = useState(Number( localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltradoss, setGastosFiltrados] = useState([]);


  useEffect(() =>{
    if(Object.keys(gastoEditar).length >0){
      setModal(true)
     
      setTimeout(() => {
       setAnimarModal(true)
      }, 250);
    }
  },[gastoEditar])

  // Controla presupuesto en localstorage cada que se añade
  useEffect(() =>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])

  useEffect(() =>{
      if(filtro){
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria  === filtro)
        setGastosFiltrados(gastosFiltrados)
      }
  },[filtro])

   // Se ejecuta una sola vez para verificar si tiene presupuesto y no cargar el modulo de insertar
  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0){
      setisValidPresupuesto(true);
    }
  },[])

  const handleNuevoGasto = () => {
     setModal(true)
     setGastoEditar({})

     setTimeout(() => {
      setAnimarModal(true)
     }, 250);
  }

  const guardarGasto = gasto =>{

    if(gasto.id){
      const gastoActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizado)
      setGastoEditar({})
    }else{
      gasto.id= generarId();
      gasto.fecha=Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);

  }

  const eliminarGasto = id =>{
    const gastosActualizados= gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar': ''} >
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
           <Filtro
            filtro={filtro}
            setFiltro={setFiltro}
           />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltradoss={gastosFiltradoss}
            />
          </main>
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} 
          alt="Icono nuevo gasto"
          onClick={handleNuevoGasto}
          />  
        </div>
        </>
      ) }

      {modal && <Modal
        setModal = {setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
    </div>
  )
}

export default App
