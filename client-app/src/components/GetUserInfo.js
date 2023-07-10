import { useState } from "react";

function GetUserInfo({ userData, setUserData}) {

    const [userSelectionsComplete, setUserSelectionsComplete] = useState(false)

    const handleZoneChange = (event) => {
        setUserData({ ...userData, selectedZone: event.target.value });
    };

    const handlePaymentChange = (event) => {
        setUserData({ ...userData, paymentMethod: event.target.value });
    }

    const handleConcessionChange = (event) => {
        setUserData({ ...userData, isConcession: event.target.checked ? "concession" : "adult" })
    }

    const checkUserDataComplete = () => {
        if (userData.selectedZone && userData.paymentMethod) {
            setUserSelectionsComplete(true);
        } else {
            setUserSelectionsComplete(false)
        }
    }

    return (
        <div id="getAllUserInfo">
            {/* What zones do you use? */}
            <div id="zoneSelectorDiv" className="userInfo">
                <label htmlFor="zoneSelect">Zone:</label>
                <select
                    id="zoneSelect"
                    value={userData.selectedZone}
                    onChange={handleZoneChange}
                >
                    <option value="">Select Zone</option>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                </select>
            </div>

            {/* Method payment? (Cash/Contactless/Compass card) */}
            <div id="methodPaymentDiv" className="userInfo">
                <label htmlFor="paymentMethod">Payment Method: </label>
                <select
                    id="paymentMethod"
                    value={userData.paymentMethod}
                    onChange={handlePaymentChange}
                >
                    <option value="">Payment Type</option>
                    <option value="cashFares">Cash</option>
                    <option value="contactlessFares">Contactless</option>
                    <option value="storedValueFares">Compass Card</option>
                </select>
            </div>
            <div id='concessionDiv' className="userInfo">
                <label htmlFor='concessionCheckbox'>
                    Concession*:
                        <input
                            id="concessionCheckbox"
                            type="checkbox"
                            onChange={handleConcessionChange}
                        />
                </label>
            </div>
        </div>
    )
}

export default GetUserInfo
