import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader'
import GetUserInfo from './components/GetUserInfo'
import DataAnalyser from './components/DataAnalyser'
import AnalysisDisplay from './components/AnalysisDisplay'
import FaQ from './components/FaQ'
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
  const [displayFaq, setDisplayFaq] = useState(null)

  // Check whether to display the F&Q section
  const faqCheck = () => {
    setDisplayFaq(true)
  }


  // Conditional rendering of file upload
  const [userSelectionsComplete, setUserSelectionsComplete] = useState(false)
  useEffect(() => {
    if (userData.paymentMethod !== "" && userData.selectedZone !== "") {
      setUserSelectionsComplete(true)
     
    }
  }, [userData.paymentMethod, userData.selectedZone]);


  const handleFileUpload = (data) => {
    setFileData(data)
  }

  // Reset the form 
  const handleResetButton = () => {
    setUserData(user)
    setFileData(null)
    setAnalysedData(null)
    setUserSelectionsComplete(false)
  }
  
  let content;

  let introText = `Select the your current commute zone,
  your payment type, and whether you pay a concession fare or not`

  // Display analysed data and hide form 
  if (analysedData) {
    content = (
      <div className='App'>
        <AnalysisDisplay analysedData={analysedData} userData={userData} />
      <button id="resetButton" onClick={handleResetButton}>Reset</button>
      </div>
    );
  } 

  else if (displayFaq) {
    content = (
      <FaQ setDisplayFaq={setDisplayFaq}/>
    )
  }
  else { // Display Form
    content = (
      <div className='App'>
        <div>
        <h1 className='titleDiv'>Should you buy a monthly pass?</h1>
          <p className='introText'>{introText}</p>
        </div>
        <GetUserInfo userData={userData} setUserData={setUserData} />
        <div className={"fileUploaderDiv"}>
          {userSelectionsComplete && <FileUploader onFileUpload={handleFileUpload} />}
        </div>
        
        {fileData && <DataAnalyser
            fileData={fileData}
            userData={userData}
            setAnalysedData={setAnalysedData}
            analysedData={analysedData}
        />}
        <button onClick={faqCheck}>F&Q</button>
      </div>
    );
  }

  return content;
};

export default App;
