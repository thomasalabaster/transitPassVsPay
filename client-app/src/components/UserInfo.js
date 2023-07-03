import { useRef } from 'react';

function UserInfo({ 
    selectedZone,
    setSelectedZone,
    paymentMethod,
    setPaymentMethod,
    handleFormReset,
}) {
    const zoneSelectRef = useRef(null);
    const paymentMethodRef = useRef(null);

    const handleZoneChange = (event) => {
        setSelectedZone(event.target.value);
    };

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

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
                <option value="zoneOne">1</option>
                <option value="zoneTwo">2</option>
                <option value="zoneThree">3</option>
                <option value="concession">Concession</option>
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
                <option value="cash">Cash</option>
                <option value="contactless">Contactless</option>
                <option value="compass">Compass Card</option>
            </select>

            <button onClick={handleFormReset}>Reset</button>
        </div>
    );
}

export default UserInfo;
