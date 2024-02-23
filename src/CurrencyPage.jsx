import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import animation from './assests/animation.json'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const CurrencyPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 250 }); // Define mobile breakpoint
    const [allData, setAllData] = useState([]);
    const [from, SetFrom] = useState("usd");
    const [inputValue, SetInputValue] = useState(1);
    const [output, SetOutput] = useState();
    const [to, SetTo] = useState("inr");

    useEffect(() => {
        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`)
            .then((res) => {
                setAllData(Object.keys(res.data.usd)); // Extracting keys from the object
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleFrom = (e) => {
        SetFrom(e.target.value);
        SetOutput()
    };

    const handleTo = (e) => {
        SetTo(e.target.value);
        SetOutput()
    };

    const handleValue = (e) => {
        SetInputValue(e.target.value);
        SetOutput()
    };

    const handleSubmit = () => {
        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                const value = res.data[from];
                const price = value[to];
                SetOutput(inputValue * price);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className='curr-div'>
                <h4 className='text-center alert alert-secondary mt-3'>Currency Converter Application</h4>
                <div className="container">
                    <div className='row '>
                        {!isMobile && ( // Render SVG only if not in mobile
                            <div className='col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center'>
                                <Lottie style={{ width: '300px', height: '200px' }} animationData={animation}></Lottie>
                            </div>
                        )}
                        <div className={`col-lg-${isMobile ? '12' : '6'} col-md-6 col-sm-12`}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput" >Enter Amount:</label>
                                    <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter your amount" onChange={handleValue} value={inputValue}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Currency from:</label>
                                    <select className="form-select" id="exampleFormControlSelect1" value={from} onChange={handleFrom}>
                                        {allData.map((val, index) => (
                                            <option key={index} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect2">Currency to:</label>
                                    <select className="form-select" id="exampleFormControlSelect2" value={to} onChange={handleTo}>
                                        {allData.map((val, index) => (
                                            <option key={index} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <div className='text-center'>{output?<div className='alert alert-info fw-bold mt-2'>
                                {output?`Output: ${inputValue}  ${from} = ${output}  ${to}`:""}
                                </div>:""}
                                <div>
                                    <button type='button' className='btn btn-primary mt-2 ' onClick={handleSubmit}>Convert Money</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isMobile && ( // Render SVG only if not in mobile
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1425 290"><path fill="#a2d9ff" fillOpacity="0.5" d="M0,135L34.3,154.7C68.6,181,137,235,206,234.7C274.3,235,343,181,411,176C480,171,549,213,617,213.3C685.7,213,754,171,823,176C891.4,181,960,235,1029,229.3C1097.1,224,1166,160,1234,128C1302.9,96,1371,96,1406,96L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
            )}
        </>
    );
};

export default CurrencyPage;
