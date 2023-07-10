import React, { useState } from 'react';
import FileUploader from './components/FileUploader'
import GetUserInfo from './components/GetUserInfo'
import DataAnalyser from './components/DataAnalyser'
import AnalysisDisplay from './components/AnalysisDisplay'
import './styles.css'

const App = () => {
  const user = {
    paymentMethod: "",
    selectedZone: "",
    isConcession: "adult"
}
  const [userData, setUserData] = useState(user)
  const [fileData, setFileData] = useState(null)
  const [analysedData, setAnalysedData] = useState(null)

  // TODO @@@@@
  const [userSelectionsComplete, setUserSelectionsComplete] = useState(false)

  
  const handleFileUpload = (data) => {
    setFileData(data)
  }

  const handleResetButton = () => {
    setUserData(user)
    setFileData(null)
    setAnalysedData(null)
  }
  
  let content;

  let testText = `Select the your current commute zone,
  your payment type, and whether you pay a concession fare or not`

  // Display analysed data and hide form 
  if (analysedData) {
    content = (
      <div className='App'>
        <AnalysisDisplay analysedData={analysedData} userData={userData} />
        <button onClick={handleResetButton}>Reset</button>
      </div>
    );
  } 
  else { // Display Form
    content = (
      <div className='App'>
        <div>
        <h1>Should you buy a monthly pass?</h1>
          <p>{testText}</p>
        </div>
        <GetUserInfo userData={userData} setUserData={setUserData} />

        {!fileData ? (
          <FileUploader onFileUpload={handleFileUpload} />
        ) : (
          <DataAnalyser
            fileData={fileData}
            userData={userData}
            setAnalysedData={setAnalysedData}
            analysedData={analysedData}
          />
        )}
      </div>
    );
  }

  return content;
};

export default App;
