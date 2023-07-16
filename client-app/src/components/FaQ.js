function FaQ({ setDisplayFaq }) {
    const faqCheck = () => {
        setDisplayFaq(false)
    }

    return (
        <div className="faqDiv">
            <h1 className="faqTitle">F&Q</h1>
                <h3 className="faqQuestion">What is this web app?</h3>
                    <p className="faqAnswer">It's a web application which informs you what is more cost effective, buying a monthly travel pass or paying for each journey separately.</p>
                <h3 className="faqQuestion">Where is it based</h3>
                    <p className="faqAnswer">This web app only works for Vancouver B.C.'s <i>Compass Card</i> and it's use on the Translink system.</p>
                <h3 className="faqQuestion">How does it work?</h3>
                    <p className="faqAnswer">It analyses your data from your compass card account and relays only the relevant information back to you.</p>
                <h3 className="faqQuestion">How do I get my .CSV data?</h3>
                        <ol >
                            <li>Go to <a href="https://www.compasscard.ca/">the compass card website and sign in to your account</a></li>
                            <li>Next to your card, select "<i>View card usage</i>"</li>
                            <li>Under the "<b>Show:</b>" title, select the drop, and then select any date range you would like to access.</li>
                            <li>Under this, select <b>Card Usage</b> and make sure <b>Payments</b> is not selected.</li>
                            <li>Click "<b>Download CSV</b>"</li>
                        </ol>    
            <button onClick={faqCheck}>Home</button>
        </div>
    )
} 

export default FaQ