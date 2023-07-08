function GetUserInfo({ userData, setUserData}) {

    const handleZoneChange = (event) => {
        setUserData({ ...userData, selectedZone: event.target.value });
    };

    const handlePaymentChange = (event) => {
        setUserData({ ...userData, paymentMethod: event.target.value });
    }

    const handleConcessionChange = (event) => {
        setUserData({ ...userData, isConcession: event.target.checked ? "concession" : "adult" })
    }

    return (
        <div>
            {/* What zones do you use? */}
            <label htmlFor="zoneSelect">Zone:</label>
            <select
                id="zoneSelect"
                value={userData.selectedZone}
                onChange={handleZoneChange}
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
                value={userData.paymentMethod}
                onChange={handlePaymentChange}
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
                        onChange={handleConcessionChange}
                    />
            </label>
        </div>
    )
}

export default GetUserInfo
