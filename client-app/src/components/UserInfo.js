import { useRef, useState } from 'react';

function UserInfo({ 
    selectedZone,
    setSelectedZone,
    paymentMethod,
    setPaymentMethod,
    handleFormReset,
    isConcession,
    setIsConcession
}) {
    const zoneSelectRef = useRef(null);
    const paymentMethodRef = useRef(null);

    const handleZoneChange = (event) => {
        setSelectedZone(event.target.value);
    };

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    const handleConcessionChange = (event) => {
        setIsConcession(event.target.checked ? "concession" : "adult")
    }

    return (
        <div>
            {/* What zones do you use? */}
            <label htmlFor="zoneSelect">Zone:</label>
            <select
                id="zoneSelect"
                value={selectedZone}
                onChange={handleZoneChange}
                ref={zoneSelectRef}
            >
                <option value="">-- Select Zone --</option>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
            </select>

            {/* Method payment? (Cash/Contactless/Compass card) */}
            <label htmlFor="paymentMethod">Payment Method: </label>
            <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentChange}
                ref={paymentMethodRef}
            >
                <option value="">-- Select Payment Type --</option>
                <option value="cashFares">Cash</option>
                <option value="contactlessFares">Contactless</option>
                <option value="storedValueFares">Compass Card</option>
            </select>
            
            <label htmlFor='concessionCheckbox'>
                Concession*:
                    <input
                        id="concessionCheckbox"
                        type="checkbox"
                        checked={isConcession === "concession"}
                        onChange={handleConcessionChange}
                    />
            </label>
            <p>
                *Concession eligible: HandyCard holders, seniors 65 and older, youth 13 to 18 years*, children 5 to 12 years 
            </p>

            <button onClick={handleFormReset}>Reset</button>
        </div>
    );
}

export default UserInfo;
