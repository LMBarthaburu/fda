import { Route, Routes } from "react-router-dom";
import Home from "./Paginas/Home";
import Producto from "./Paginas/Producto";

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/producto/:id' element={<Producto/>}/>
      </Routes>
    </>
  );
}

export default App;
