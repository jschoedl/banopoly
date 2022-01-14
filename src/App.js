import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Player from "./Player";


function App() {
    return (
        // <Player address="ban_3mppwzuwc3m586i6pdegsyon76hxnm5pch4jwenb97zamjt7b9o1muadwnp4"/>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Player
                        address="ban_3mppwzuwc3m586i6pdegsyon76hxnm5pch4jwenb97zamjt7b9o1muadwnp4"/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
