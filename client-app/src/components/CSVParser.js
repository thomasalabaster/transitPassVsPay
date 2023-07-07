import { useState, useRef } from 'react'
import Papa from 'papaparse';

// Months
const namesOfMonths = ['jan','feb', 'mar', 'apr', 'may','jun','jul','aug','sep', 'oct', 'nov','dec']
let arrayMonths = namesOfMonths.map((month) => {
  return {
    monthName: month,
    totalCost: 0,
    journeyCount: 0,
    travelled: false
  }
})

const compassFares = {
  "cashFares" : {
    "adult": {
      "one": 3.15,
      "two": 4.55,
      "three": 6.20
    },
    "concession": {
      "one": 2.10,
      "two": 3.10,
      "three": 4.25
    }
  },
  "contactlessFares" : {
    "adult": {
      "one": 3.15,
      "two": 4.55,
      "three": 6.20
    },
    "concession": {
      "one": 3.15,
      "two": 4.55,
      "three": 6.20
    }
  },
  "storedValueFares": {
    "adult": {
      "one": 2.55,
      "two": 3.75,
      "three": 4.80
    },
    "concession": {
      "one": 2.10,
      "two": 3.10,
      "three": 4.25
    }
  },
  "monthlyPasses": {
    "one": 104.90,
    "two": 140.25,
    "three": 189.45,
    "concession": 59.95
  }
}

const csvHeaders = "DateTime,Transaction,Product,LineItem,Amount,BalanceDetails,JourneyId,LocationDisplay,TransactonTime,OrderDate,Payment,OrderNumber,AuthCode,Total"

let monthsTravelled = 0
let totalJourneyCost = 0
let totalJourneyCount = 0
let totalTransferCount = 0

function CSVParser({ 
  selectedZone,
  setSelectedZone,
  paymentMethod,
  setPaymentMethod,
  handleFormReset,
  isConcession
}) {
  const [message, setMessage] = useState(null)
  const [fileError, setFileError] = useState("") 
  const [infoGather, setInfoGather] = useState(true)
  const fileInputRef = useRef(null)
  let testChange = true

  // Set monthly pass for comparison, check if concession & zone3 (exception)
  const userZoneCost = isConcession === "concession" && selectedZone === "three"
    ? compassFares.monthlyPasses.concession
    : compassFares.monthlyPasses[selectedZone]

  // Reset function
  const handleResetAll = (event) => {
    handleFormReset()
    setMessage("")
    setInfoGather(true)
    monthsTravelled = 0
    totalJourneyCost = 0
    totalJourneyCount = 0
    totalTransferCount = 0

    const resetMonths = arrayMonths.map((month) => ({
      ...month,
      totalCost: 0,
      journeyCount: 0,
      travelled: false,
    }))
    arrayMonths = resetMonths;

  }

  const handleFileChange = (event) => {
  
    // Assign file to const
    const file = event.target.files[0];
    setInfoGather(false)
    // @@@@ SET INFO GATHER
  
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
        results.data.forEach((transaction) => { 
          // Skip empty array at end
          if (transaction.length === 0) {
            return
          } // Check if transfer, don't include
          if (transaction[1].slice(0, 8) === 'Transfer') {
              totalTransferCount += 1
              return
          }
          
          // Loop through each month, to add their transactions
          arrayMonths.forEach(month => {
            // Check if month matches month in transaction
            if (month.monthName === transaction[0].slice(0,3).toLowerCase()) {
              // Get the value
              let tempValue = transaction[4].replace(/[^0-9.-]/g, "")
              month.totalCost += (parseFloat(tempValue))

              // @@@ Need to add check if "Transfer", therefore not a journey
              month.journeyCount += 1
              totalJourneyCount += 1
              
              // Update whether month has been travelled in
              if (!month.travelled) {
                monthsTravelled += 1
                month.travelled = Boolean(month.journeyCount)
              }
              
              // Add value to total journey costs
              totalJourneyCost += parseFloat(tempValue)
            }
          })
        })
        // Turn +ve number to -ve  
        totalJourneyCost = Math.abs(totalJourneyCost)       
        let monthlyPassCost = userZoneCost * monthsTravelled
        let monthlylSavings = Math.abs(((totalJourneyCost / monthsTravelled) - userZoneCost).toFixed(2))

        // Set the normal fare cost
        let fareSelector = compassFares[paymentMethod][isConcession][selectedZone]

        // See how many more journeys a month needed
        let requiredJourneys = monthlylSavings/fareSelector

        // Check if saving money
        if (monthlyPassCost < totalJourneyCost)
        {
          setMessage(`Get a pass! You're losing out on $${monthlylSavings} a month!`)
          return
        }
        setMessage(`Stick to what you're doing, you need to spend $${monthlylSavings.tof} more per month.
        You need to make another ${requiredJourneys.toFixed(0)} journeys a month to make it worth!
        You've made a total of ${totalJourneyCount} journeys at cost of $${totalJourneyCost.toFixed(2)}.
        You additionally made ${totalTransferCount} transfers in your time!`)
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
      <button onClick={handleResetAll}>Compute again</button>
    </div>

  );
}

export default CSVParser;
