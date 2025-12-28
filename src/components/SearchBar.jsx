import { useState } from 'react';

import './SB.css';

const SearchBar = ({ onSearch, setTheme }) => {
    const [city, setcity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city);
        setcity('');
    }

    const lightSound = new Audio("/src/assets/sounds/mixkit-little-bird-calling-chirp-23.wav")
    const darkSound = new Audio("/src/assets/sounds/mixkit-small-cricket-screech-1781.wav");
    lightSound.volume = 0.6;
    darkSound.volume = 0.6;

    function changeTheme(TH) {
        if (TH === "white") {
            document.getElementById("BG").style.backgroundColor = "rgba(220, 179, 42, 0.25)";
            document.getElementsByClassName("app-bg")[0].style.backgroundImage =
                'url("/hero-3.jpg")';
            document.body.classList.add("style_W")
            document.body.classList.remove("style_D")
            setTheme("style_TW")
            const W = document.getElementById("W")
            const D = document.getElementById("D")
            if (!W.classList.contains("BOLD")) {
                W.classList.add("BOLD");
                D.classList.add("LIGHT");
                W.classList.remove("LIGHT");
                D.classList.remove("BOLD");
            }
            lightSound.currentTime = 0;
            lightSound.play();
        }
        else {
            document.getElementById("BG").style.backgroundColor = "rgba(27, 29, 94, 0.25)";
            document.getElementsByClassName("app-bg")[0].style.backgroundImage = 'url("/Dark.png")';
            document.body.classList.add("style_D")
            document.body.classList.remove("style_W")
            setTheme("style_TR")
            const W = document.getElementById("W")
            const D = document.getElementById("D")
            if (!D.classList.contains("BOLD")) {
                D.classList.add("BOLD");
                W.classList.add("LIGHT");
                D.classList.remove("LIGHT");
                W.classList.remove("BOLD");
            }
            darkSound.currentTime = 0;
            darkSound.play();
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter city...' value={city} onChange={(e) => setcity(e.target.value)} />
                <input type="submit" value="Search" />
            </form>

            <div style={{ display: "flex", textAlign: "center", margin: "2px 80px 0 0", width: "60px", height: "25px", border: "1px solid", borderRadius: "10px", backgroundColor: "lightgreen" }}>
                <span className="BOLD" id='W' style={{ display: "inline-block", alignContent: "center", height: "25px", width: "50%", cursor: "pointer" }} onClick={(e) => changeTheme("white")}>☀️</span>
                <span className="LIGHT" id='D' style={{ display: "inline-block", alignContent: "center", height: "25px", borderLeft: "1px solid grey", width: "50%", cursor: "pointer" }} onClick={(e) => changeTheme("dark")}>🌑</span>
            </div>
        </div>
    )
}

export default SearchBar