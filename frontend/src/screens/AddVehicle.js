import React from 'react'
import Navbar from '../Navbar'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addVehicle } from '../contract';
const AddVehicle = () => {

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [variant , setVarient] = useState('');
    const [price, setPrice] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [forSale, setSale] = useState(false);
    const [kilometer, setKilometer] = useState()
    const [millage, setMillage] = useState()
    const [signal, setSignal] = useState(false);
    const [signal1, setSignal1] = useState(true);



    const handleMake = (event) => {
        setMake(event.target.value);
    };
    const handleModel = (event) => {
        setModel(event.target.value);
    };
    const handleVarient = (event) => {
        setVarient(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleKilometers = (event) => {
        setKilometer(event.target.value);
    };
    const handleMillage = (event) => {
        setMillage(event.target.value);
    };
    const handleRegNumber = (event) => {
        setRegNumber(event.target.value);
    };


    const addVehiclebutton = () => {
        try {
        addVehicle(regNumber,make,model,variant,price,forSale,kilometer,millage,localStorage.getItem("userAddress"));
        } catch (error) {
            console.log(error)
        }
        setSignal(true);
        setSignal1(false);
    }

    return (
        <>
            <Navbar title={"Add Vehicle to My Garage"} />
            {signal && <div className='flex '>
                <div className='alert'>Vehicle Added Successfully.
                    <Link to='/dashboard' className='comp'><button className='card-button1a'>Ok</button>
                    </Link>
                </div></div>}
            {signal1 && <div className='hero-image flex'>

                <div className='cchild'>
                    <div className='inputdiv'>
                        <p>Enter Make:</p>
                        <input className=''
                            type="text"
                            value={make}
                            onChange={handleMake}
                        />
                    </div>
                    <div className='inputdiv'>
                        <p>Enter Model:</p>
                        <input className=''
                            type="text"
                            value={model}
                            onChange={handleModel}
                        />
                    </div>
                    <div className='inputdiv'>
                        <p>Enter Varient:</p>
                        <input className=''
                            type="text"
                            value={variant}
                            onChange={handleVarient}
                        />
                    </div>

                    <div className='inputdiv'>
                        <p>Enter Price:</p>
                        <input className=''
                            type="text"
                            value={price}
                            onChange={handlePrice}
                        />
                    </div>
                    <div className='inputdiv'>
                        <p>Enter Registration Number:</p>
                        <input className=''
                            type="text"
                            value={regNumber}
                            onChange={handleRegNumber}
                        />
                    </div>

                    <div className='inputdiv'>
                        <p>Enter Kilometer Travelled:</p>
                        <input className=''
                            type="number"
                            value={kilometer}
                            onChange={handleKilometers}
                        />
                    </div>
                    <div className='inputdiv'>
                        <p>Millage:</p>
                        <input className=''
                            type="number"
                            value={millage}
                            onChange={handleMillage}
                        />
                    </div>
                    <div className=''>
                        <p>For Sale:</p>
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={forSale}
                                onChange={() => setSale(!forSale)}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>


                    <button onClick={addVehiclebutton} className='card-button1a' disabled={(make.length && price.length && model.length && variant.length && regNumber.length) === 0}>Add Vehicle</button>

                </div>
            </div>}
        </>
    )
}

export default AddVehicle