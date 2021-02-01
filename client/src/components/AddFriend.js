import axios from 'axios';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const AddFriend = () => {

    const [isim, setIsim] = useState("")
    const [tarih, setTarih] = useState()
    const { uyelikKodu, arkadaslarimiGetir, giris } = useContext(AppContext)

    const arkadasiKaydet = () => {
        axios.put("http://localhost:8000/addfriend",
            { code: uyelikKodu, newFriend: { isim: isim, tarih: tarih } }).then(() => {
                setIsim("")
                setTarih(new Date())
                arkadaslarimiGetir()
            })
    }

    return (
        <div>
            {giris &&
                <div className="formDiv">
                    <h3 className="formBaslik">Yeni Arkadaş Ekle</h3>
                    <input className="arkadasIsmi"
                        placeholder="isim..."
                        value={isim}
                        onChange={(e) => setIsim(e.target.value)}
                    ></input>
                    <input className="tarih" type="date"
                        value={tarih}
                        onChange={(e) => setTarih(e.target.value)}
                    >
                    </input>
                    <button className="kayitButton"
                        onClick={() => arkadasiKaydet()}
                    >Kaydet</button>
                </div>}
        </div>
    );
};

export default AddFriend;