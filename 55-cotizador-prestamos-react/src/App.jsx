import { useState, useEffect } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import { formatearDinero, calcularTotalPagar } from './helpers';

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6); //select cantidad de meses
  const [total, setTotal] = useState(calcularTotalPagar(0));
  const [pago, setPago]=useState(0);

  //total a pagar 
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  //total a pagar por meses
  useEffect(()=>{
    setPago(total/meses);
  }, [total]);

  
  //variables fijas
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;


  //función setear cantidad
  function handleChange(e) {
    setCantidad(Number(e.target.value));
  }

  //restar de 100 en 100 al picar al boton de "-"
  function handleClickRestar(e) {
    //tomara la cantidad actual (state) y le restara el step (100)
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert('Minimo es 0');
      return;
    }
    //modifica el state al final y renderizará la vista
    setCantidad(valor);

  }
  function handleClickSumar(e) {
    //tomara la cantidad actual (state) y le restara el step (100)
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert(`Maximo es :${MAX}`);
      return;
    }
    //modifica el state al final y renderizará la vista
    setCantidad(valor);

  }



  return (

    <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
      <Header />

      {/*Botones de incremento y decremento */}
      <div className="flex justify-between my-6">

        <Button
          //los componente le puedes enviar diferentes props
          operador='-'
          fn={handleClickRestar}
        />

        <Button
          operador='+'
          fn={handleClickSumar}
        />

      </div>


      <input type="range"
        className='w-full bg-gray-200 h-6 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)} MXN
      </p>


      <h2 className='text-2xl font-extrabold text-gray-500 text-center '>
        Elige un <span className='text-indigo-600'>plazo </span> a pagar
      </h2>

      <select
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={meses}
        onChange={e => setMeses( parseInt(e.target.value))}
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>


      <div className="mt-5 space-y-3 bg-gray-50 p-5">
        <h2 className='text-2xl font-extrabold text-gray-500 text-center '>
          Resumen <span className='text-indigo-600'>de pagos </span>
        </h2>


        <p className="text-xl text-gray-500 text-center font-bold" >{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold" >{formatearDinero(total)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold" >{formatearDinero(pago)} mensuales</p>
      </div>


    </div>

  )
}

export default App
