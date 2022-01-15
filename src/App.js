import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SetupGame from "./create/SetupGame";
import ShowJoinQRCode from "./ShowJoinQRCode";


function App() {
    return (
        // <Balance address="ban_3mppwzuwc3m586i6pdegsyon76hxnm5pch4jwenb97zamjt7b9o1muadwnp4"/>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<SetupGame/>}/>
                    <Route path="/join" element={<ShowJoinQRCode/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
