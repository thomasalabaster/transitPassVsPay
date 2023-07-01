import { useState, useEffect} from 'react'
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
let monthsTravelled = 0
let totalJourneyCost = 0

// User will select a zone
let userZoneCost = 104.90

// Message to display
let tempString = ''

function CSVParser() {
  let [tranLen, setTranLen] = useState([0])

  const handleFileChange = (event) => {

    // Assign file to const
    const file = event.target.files[0];
  
    // Parse the CSV file
    Papa.parse(file, {
      complete: (results) => {
        // Access parsed data from 'results' variable
        setTranLen(results.data.length)

        // Check what month the journey was in, add to month cost and journey.count
        results.data.map((transaction) => {
          arrayMonths.forEach(month => {
            if (month.monthName === transaction[0].slice(0,3).toLowerCase())
            {
              let tempValue = transaction[4].replace(/[^0-9.-]/g, "")
              month.totalCost += parseFloat(tempValue)
              month.journeyCount += 1
            }
          });
        })

        // Loop through each month, check if pass is better value
        arrayMonths.forEach(month => {
          // Check if month has been travelled and update monthsTravelled
          month.travelled = Boolean(month.journeyCount)
          monthsTravelled += month.travelled ? 1 : 0
          // Add month cost to total
          totalJourneyCost += Math.abs(month.totalCost)
        })

        // monthlyPass Costs, annual/monthly savings
        let monthlyPassCost = userZoneCost * monthsTravelled
        let annualSavings = (totalJourneyCost - monthlyPassCost * userZoneCost).toFixed(2)
        let monthlylSavings = (Math.abs((totalJourneyCost / monthsTravelled) - userZoneCost)).toFixed(2) 

        // Check if saving money
        if (monthlyPassCost < totalJourneyCost)
        {
          setTranLen(`Get a pass!`)

          return
        }
        setTranLen(`Stick to what you're doing, you need to spend $${monthlylSavings} more per month`)

      }
    })

  }



  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <p>{tranLen}</p>
      <p>{tempString}</p>
    </div>
  );
}

export default CSVParser;
