import { useState, useRef } from 'react'
import Papa from 'papaparse';

// Months
const namesOfMonths = ['jan','feb', 'mar', 'apr', 'may','jun','jul','aug','sep', 'oct', 'nov','dec']
const arrayMonths = namesOfMonths.map((month) => {
  return {
    monthName: month,
    totalCost: 0,
    journeyCount: 0,
    travelled: false
  }
})
// Monthly pass costs
const monthlyPasses = {
    // "zoneOne": 104.90,
    "zoneOne": 5,
    "zoneTwo": 140.25,
    "zoneThree": 189.45,
    "concession": 59.95
}
const csvHeaders = "DateTime,Transaction,Product,LineItem,Amount,BalanceDetails,JourneyId,LocationDisplay,TransactonTime,OrderDate,Payment,OrderNumber,AuthCode,Total"

let monthsTravelled = 0
let totalJourneyCost = 0

function CSVParser({ 
  selectedZone,
  setSelectedZone,
  paymentMethod,
  setPaymentMethod,
  handleFormReset
}) {
  const [message, setMessage] = useState(null)
  const [fileError, setFileError] = useState("") 
  const fileInputRef = useRef(null)
  // User selected zone
  const userZoneCost = monthlyPasses[selectedZone]

  const handleFileChange = (event) => {
    // Check if a zone has been selected
    if (!selectedZone) {
      setFileError("Please select a fare zone before uploading a file")
      setTimeout(() => {
        setFileError("")
      }, 3000)
      return
    }

    // Assign file to const
    const file = event.target.files[0];
  
    // Parse the CSV file
    Papa.parse(file, {
      complete: (results) => {
        // Error checking
        if (results.data[0].join(',') !== csvHeaders)
        {
          setFileError("Incorrect file, try uploading again")
          handleFormReset()
          // Rest file input value
          fileInputRef.current.value = null
          setTimeout(() => {
            setFileError("")
          }, 3500)
          return
        }
 
        // Check what month the journey was in, add to month cost and journey.count
        results.data.forEach((transaction) => { // Use forEach instead of map
          arrayMonths.forEach(month => {
            if (month.monthName === transaction[0].slice(0,3).toLowerCase()) {
              let tempValue = transaction[4].replace(/[^0-9.-]/g, "")
              month.totalCost += parseFloat(tempValue)
              month.journeyCount += 1
            }
          });
        })

        // Loop thru months, update travelled, monthsTravelled, totalJourneyCost
        arrayMonths.forEach(month => {
          // Check if month has been travelled and update monthsTravelled
          month.travelled = Boolean(month.journeyCount)
          monthsTravelled += month.travelled ? 1 : 0
          // Add month cost to total
          totalJourneyCost += Math.abs(month.totalCost)
        })

        // monthlyPass costs, annual/monthly savings
        let monthlyPassCost = userZoneCost * monthsTravelled
        let annualSavings = (totalJourneyCost - monthlyPassCost * userZoneCost).toFixed(2)
        let monthlylSavings = (Math.abs((totalJourneyCost / monthsTravelled) - userZoneCost)).toFixed(2) 

        // Check if saving money
        if (monthlyPassCost < totalJourneyCost)
        {
          setMessage(`Get a pass! You're losing out on $${monthlylSavings} a month!`)
          return
        }
        setMessage(`Stick to what you're doing, you need to spend $${monthlylSavings} more per month`)

      }
    })
  }

  return (
    <div>
      {selectedZone && paymentMethod && (
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      )}
      
      {fileError && <p>{fileError}</p>}
      <p>{message}</p>
    </div>
  );
}

export default CSVParser;
