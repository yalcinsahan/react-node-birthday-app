import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const GetCode = () => {

    const { giris, uyelikKodu, changeUyelikKodu, tumArkadaslarim, kalanSureHesapla } = useContext(AppContext)

    return (
        <div className="subDiv">
            <input
                className="codeInput"
                placeholder="üyelik kodunuz..."
                value={uyelikKodu}
                onChange={(e) => changeUyelikKodu(e.target.value)}
            >
            </input>

            <div className="flexBox">

                {giris && tumArkadaslarim.map((arkadas, index) =>
                    <div key={arkadas.isim} className="infoBox">
                        <h2 className="isimBaslik">{arkadas.isim}</h2>
                        <h3 className="gunBaslik">{kalanSureHesapla(index)}</h3>
                    </div>)}

            </div>


        </div>
    );
};

export default GetCode;