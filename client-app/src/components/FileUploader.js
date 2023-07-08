import { useState } from 'react'
import Papa from 'papaparse';
import MessageDisplay from './MessageDisplay'


function FileUploader({ onFileUpload }) {
    const [message, setMessage] = useState('')
    const csvHeaders = "DateTime,Transaction,Product,LienItem,Amount,BalanceDetails,JourneyId,LocationDisplay,TransactonTime,OrderDate,Payment,OrderNumber,AuthCode,Total"

    const handleFileChange = (event) => {
        const file = event.target.files[0]
    
    Papa.parse(file, {
        complete: (results) => {
            // Error checking
            if (results.data[0].join(',') !== csvHeaders) {
                setMessage("Incorrect file, try uploading again")
                setTimeout(() => {
                    setMessage("")
                }, 3500)
            }
            onFileUpload(results)
        }
    })
}

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <MessageDisplay message={message} />
        </div>
    )
}

export default FileUploader