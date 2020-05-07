import React, {useEffect, useState} from 'react';
import './App.css';
import clientAxios from "./config/axios";
import BeautyStars from "beauty-stars";

const App = () => {
    const initalState = {
        title: '',
        img: '',
    }
    const [rate, setRate] = useState(0);
    const [maxState, setMaxState] = useState(10);
    const [currentComic, setCurrentComic] = useState(initalState);

    const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

    const getMax = maxInput => {
        let max;
        if (maxInput) {
            max = maxInput
            setMaxState(maxInput)
        } else {
            max = maxState
        }
        return max;
    };

    const loadComic = maxInput => {
        clientAxios.get(getRandomNumber(1,getMax(maxInput))+'/info.0.json').then(({data}) => {
            setCurrentComic({
                title: data.title,
                img: data.img,
            })
            setRate(0)
        }).catch(err => console.log('Se ha generado un error', err))
    };

    useEffect(() => {
        clientAxios.get('info.0.json').then(({data}) => {
            loadComic(data.num)
        }).catch(err => console.log('Se ha generado un error', err))

    },[]);

    return (
        <div className="center-data">
            {
                currentComic.img !== '' ?
                    <div className="center">
                        <h1>{currentComic.title}</h1>
                        <img src={currentComic.img} alt={'comic'} />
                        <div className="block">
                            <div className="stars-center">
                                <BeautyStars
                                    value={rate}
                                    inactiveColor ="CCCCCC"
                                    onChange={value => setRate(value)}
                                />
                            </div>
                        </div>
                        <div className="block">
                            <button className="btn-primary" onClick={() => loadComic()}>Cargar comic aleatorio</button>
                        </div>
                    </div>
                    :
                    <div className="center">
                        <h1>Loading title...</h1>
                        <h4>Loading img...</h4>
                    </div>
            }
        </div>
    );
};

export default App;
