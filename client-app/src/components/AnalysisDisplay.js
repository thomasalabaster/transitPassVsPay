import MessageDisplay from './MessageDisplay'

function AnalysisDisplay({ analysedData, userData }) {
    let stats = analysedData.analysisObj
    let months = analysedData.arrayMonths
    let savingsMessage = ''
    let title = ''

    if (stats.monthlySavings < 0) {
        savingsMessage = `You should get a monthly card! You're paying 
        $${stats.monthlySavings.toFixed(2)} extra a month. That's the equivalent of
        an extra ${stats.requiredJourneys.toFixed(0)} journeys`
        title = 'BUY A PASS'
        
        
    }  else {
        savingsMessage = `You're spending $${stats.monthlySavings.toFixed(2)} too 
        little a month to justify buying a monthly pass. You need to make another
        ${stats.requiredJourneys.toFixed(0)} journeys a month to make it worth`
        title = "No need to buy a pass"
    }

    let toBuyOrNotToBuy = `${savingsMessage}`

    let message = `You made ${stats.totalJourneyCount} journeys 
    in total (including ${stats.totalTransferCount} transfers), at a total cost
    of $${stats.totalJourneyCost.toFixed(2)} across a period of 
    ${stats.monthsTravelled} months.`

    months.forEach(month => {
        if (month.travelled) {
            console.log(month.monthName, month.totalCost, month.journeyCount)
        }
    });

    return (
        <div>
            <MessageDisplay title={title} />
            <MessageDisplay message={toBuyOrNotToBuy} />
            <MessageDisplay message={message} />

            <table>
                <thead>
                    <tr>
                    <th></th> {/* Empty cell for the top-left corner */}
                    {months.map((month) => {
                        if (month.travelled) {
                            return <th key={month.monthName}>{month.monthName}</th>;
                        }
                        return null; // Skip rendering for months where travelled is false
                    })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Total Cost</td>
                    {months.map((month) => {
                        if (month.travelled) {
                            return <td key={month.monthName}>${Math.abs(month.totalCost).toFixed(2)}</td>;
                        }
                        return null; // Skip rendering for months where travelled is false
                    })}
                    </tr>
                    <tr>
                    <td>Journey Count</td>
                    {months.map((month) => {
                        if (month.travelled) {
                            return <td key={month.monthName}>{month.journeyCount}</td>;
                        }
                        return null; // Skip rendering for months where travelled is false
                    })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AnalysisDisplay