import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { useContext } from 'react';
import Modal from "../Modal/Modal";
import { ThemeContext } from "../../src/App";


export default function Layout(){
    const {openModal, setOpenModal} = useContext(ThemeContext)

    return (
        <ThemeContext.Provider value={{openModal, setOpenModal}}>
            <div>
                <div className="entire-page" id="entire-page">
                    <Header/>
                        <main>
                            <Outlet/>
                        </main>
                    <Footer/>
                    <div className="overlay" id="overlay" >
                        {openModal && <Modal/>}
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}