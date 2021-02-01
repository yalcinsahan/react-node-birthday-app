import React, { useState } from 'react';
import GetCode from './components/GetCode';
import './css/App.css'
import axios from 'axios'
import AppContext from './context/AppContext'
import AddFriend from './components/AddFriend';

const App = () => {

    const [uyelikKodu, setUyelikKodu] = useState("")
    const [tumArkadaslarim, setTumArkadaslarim] = useState([])
    const [giris, setGiris] = useState(false)

    const changeUyelikKodu = (yeniKod) => {
        setUyelikKodu(yeniKod)
    }

    const arkadaslarimiGetir = () => {
        axios.post("http://localhost:8000/allfriends", { code: uyelikKodu }).
            then((result) => {

                setTumArkadaslarim(result.data)
                setGiris(true)

            }).catch((err) => {
                setGiris(false)
            })
    }

    const kalanSureHesapla = (i) => {
        let now = Date.now();
        let year = new Date(tumArkadaslarim[i].tarih).setFullYear(new Date().getFullYear());

        console.log(year);
        console.log(now);

        let kalanSure = Math.ceil((year - now) / (1000 * 60 * 60 * 24))

        if (kalanSure > 0) return "Arkadaşınızın doğum gününe " + kalanSure + " gün var."
        else if (kalanSure === 0) return "Bugün arkadaşınızın doğumgünü"
        else return "Arkadaşınızın doğum günü geçmiş"

    }


    return (
        <AppContext.Provider value={{ giris, tumArkadaslarim, uyelikKodu, changeUyelikKodu, arkadaslarimiGetir, kalanSureHesapla }}>
            <div className="mainDiv">
                <div style={{ width: "25%" }}>

                </div>

                <div style={{ width: "50%" }}>
                    <GetCode />
                </div>

                <div className="rightDiv">
                    <button className="getirButton"
                        onClick={() => arkadaslarimiGetir()}
                    >
                        Arkadaşlarımı Getir
                    </button>
                    <br />
                    <button className="uyelikButton"
                        onClick={() => axios.post("http://localhost:8000/newuser")
                            .then((result) => {
                                alert("üyelik kodunuz: " + result.data.code)
                            })}
                    >Üyelik Al</button>

                    <AddFriend />
                </div>
            </div>
        </AppContext.Provider >
    );
};

export default App;