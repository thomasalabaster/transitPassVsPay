import React, { useEffect } from 'react'

function DataAnalyser({ fileData, userData, setAnalysedData }) {
  useEffect(() => {
    if (fileData) {
      const performDataAnalysis = () => {
        const namesOfMonths = ['jan','feb', 'mar', 'apr', 'may','jun','jul','aug','sep', 'oct', 'nov','dec']
        let arrayMonths = namesOfMonths.map((month) => ({
          monthName: month,
          totalCost: 0,
          journeyCount: 0,
          travelled: false
        }))

        const compassFares = {
          "cashFares": {
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
          "contactlessFares": {
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

        let totalTransferCount = 0
        let monthsTravelled = 0
        let totalJourneyCost = 0
        let totalJourneyCount = 0
        let userZoneCost = 0

        // Check what month the journey was in, add to month cost and journey count
        fileData.data.forEach((transaction) => {
          // Skip empty array at the end
          if (transaction.length === 0) {
            return
          }
          // Check if transfer, don't include
          if (transaction[1].slice(0, 8) === 'Transfer') {
            totalTransferCount += 1
            return
          }

          // Set monthly pass for comparison, check if concession & zone3 (exception)
          userZoneCost =
            userData.isConcession === "concession" && userData.selectedZone === "three"
              ? compassFares.monthlyPasses.concession
              : compassFares.monthlyPasses[userData.selectedZone]

          // Loop through each month, to add their transactions
          arrayMonths.forEach(month => {
            // Check if month matches month in transaction
            if (month.monthName === transaction[0].slice(0, 3).toLowerCase()) {
              // Get the value
              let tempValue = transaction[4].replace(/[^0-9.-]/g, "")
              month.totalCost += parseFloat(tempValue)

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
        let monthlySavings = Math.abs(((totalJourneyCost / monthsTravelled) - userZoneCost).toFixed(2))

        // Set the normal fare cost
        let fareSelector = compassFares[userData.paymentMethod][userData.isConcession][userData.selectedZone]

        // See how many more journeys a month needed
        let requiredJourneys = monthlySavings / fareSelector

        const analysisObj = {
          monthlySavings,
          requiredJourneys
        }

        setAnalysedData({ analysisObj, arrayMonths })
        console.log(monthlySavings)

      }

      performDataAnalysis()
    }
  }, [fileData])

  return null
}

export default DataAnalyser
