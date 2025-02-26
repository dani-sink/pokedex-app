import { createContext, useEffect, useRef, useState } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home'
import Pokedex from '../pages/Pokedex'
import Help from '../pages/Help'
import About from '../pages/About'
import PokemonDetails from '../pages/PokemonDetails';
import Pokedex2 from '../pages/Pokedex2';
import LegendaryPokedex from '../pages/LegendaryPokedex';
import MythicalPokedex from '../pages/MythicalPokedex';
import StatsAndBattleInfo from '../pages/StatsAndBattleInfo';
import Overview from '../pages/Overview';
import Moves from '../pages/Moves';

export const ThemeContext = createContext()


function App() {

    const [openModal, setOpenModal] = useState(false)

    //  Hide header on scroll down & show on scroll up 

    /*
        First, define variables:
            . curScroll to hold the current scroll position 
            . prevScroll to hold the previous scroll position
            . curDirection to hold the direction of the current scroll
            . prevDirection to hold the direction of the previous scroll
    */
   

    let curScroll = window.scrollY || document.documentElement.scrollTop;
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curDirection = 0;
    let prevDirection = 0;


    /* 
        Algorithm:
        ------------
        
        1) Create a scroll event listener. For that, we use the hook useRef to create
        a reference to the window object. Then, we add the event listener to this window
        reference

        2) Create onScroll function that checks the position of the scroll on each 
        scroll event. In this function, we compare the current scroll and previous
        scroll values to find the scroll direction. Once we found the direction, we
        set curDirection to that direction

        initial value: 0;   scroll up: 1;   scroll down = 2;

        3) After that, we compare curDirection and prevDirection. If they are the same, do nothing.
        Otherwise, if they are different:
            - We need to toggle the header whether curDirection is a scroll up or a 
            scroll down. 
            - If it is a scroll up, we show the header. 
            - If it is a scroll down, we hide the header.
    */


    /*
        Additionally, we want to hide the header only after it has passed a certain position on the page
        after scrolling down. Hence we create the variable threshold, which is the threshold position of 
        when the header will start to disappear on scroll down.
    */

    let threshold = 600;
    let headerToggled; // It tracks whether the current header is appearing on the page or not.
    const windowRef = useRef(window);

    const onScroll = function() {
        curScroll = window.scrollY || document.documentElement.scrollTop
        if (curScroll > prevScroll) {
            curDirection = 2
        } else {
            curDirection = 1
        }

        if (curDirection !== prevDirection){
            headerToggled = toggleHeader()
        }

        if (headerToggled == true) {
            prevDirection = curDirection;
        }

        prevScroll = curScroll;
    }

    const toggleHeader = function(){
        const header = document.getElementById('header-component');
        headerToggled = true;
        if (curDirection == 2 && curScroll > threshold){
            header.classList.add('hide');
        } else if (curDirection == 1) {
            header.classList.remove('hide');
        } else {
            headerToggled = false;
        }

        return headerToggled;
    }

    windowRef.current.addEventListener('scroll', onScroll)


    return (
        <ThemeContext.Provider value={{openModal, setOpenModal}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout/>} >
                        <Route path='*' element={<NotFound/>} />
                        <Route index element={<Home/>} />
                        <Route path='/pokedex' element={<Pokedex/>}/>
                        <Route 
                            path='/pokedex/:name' 
                            element={<PokemonDetails/>}
                        >
                            <Route index element={<Overview/>} />
                            <Route path='stats' element={<StatsAndBattleInfo />} />
                            <Route path='moves' element={<Moves />} />
                        </Route>                    
                        <Route path='/pokedex/species' element={<Pokedex2/>}/>
                        <Route path='/pokedex/legendary' element={<LegendaryPokedex/>}/>
                        <Route path='/pokedex/mythical' element={<MythicalPokedex/>}/>
                        <Route path='/help' element={<Help/>}/>
                        <Route path='/about' element={<About/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}

export default App

