import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Game from './components/Game';
function App() {
  return (
    <>
    <div className="w-screen h-screen bg-slate-950 flex flex-col">
        <BrowserRouter>
            <Routes>
                <Route path = "/" element={<Landing/>}/>
                <Route path = "/game" element={<Game/>}/>
            </Routes>
        </BrowserRouter>
 </div>
    </>
  )
}

export default App
