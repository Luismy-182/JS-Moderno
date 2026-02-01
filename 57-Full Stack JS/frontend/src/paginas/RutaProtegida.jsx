import { Outlet } from "react-router-dom";

import React from 'react'

function RutaProtegida() {
  return (
    <>
    <h1>Desde Ruta protegida</h1>
    <Outlet></Outlet>
    </>
  )
}

export default RutaProtegida