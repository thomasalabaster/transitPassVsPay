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


    return (
        <div>
            <MessageDisplay title={title} />
            <MessageDisplay message={toBuyOrNotToBuy} />
            <MessageDisplay title={"Fun stats"} />
            <MessageDisplay message={message} />
        </div>
    )
}

export default AnalysisDisplay