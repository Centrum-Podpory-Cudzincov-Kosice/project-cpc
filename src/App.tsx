import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import NavSidebar from "./components/nav-sidebar";
import {useState} from "react";
import Header from "./components/header";
import Events from "./pages/events";
import Footer from "./components/footer";

function App() {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const closeIfOpened = () => {
        if (sidebarToggle) setSidebarToggle(false);
    }

    const toggleSidebar = () => {
        setSidebarToggle(prevState => !prevState)
    }

    return (
        <BrowserRouter>
            <main>
                <NavSidebar sidebarToggle={sidebarToggle}/>
                <div className={`content ${sidebarToggle && 'moveContent'}`}
                     onClick={() => {
                         closeIfOpened();
                     }}>
                    <Header sidebarToggle={sidebarToggle}
                            toggleSidebar={toggleSidebar}
                    />

                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path={"/podujatia"} element={<Events/>}/>
                    </Routes>

                    <Footer/>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
