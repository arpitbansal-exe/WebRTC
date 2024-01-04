import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Lobby from "./Pages/Lobby"
import Room from "./Pages/Room"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Lobby/>} />
          <Route path="/room/:roomid" element={<Room/>} />

        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
