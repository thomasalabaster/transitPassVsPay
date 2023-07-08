import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader'
import GetUserInfo from './components/GetUserInfo'
import DataAnalyser from './components/DataAnalyser'

const App = () => {
  const user = {
    paymentMethod: "",
    selectedZone: "",
    isConcession: "adult"
}
  const [userData, setUserData] = useState(user)
  const [fileData, setFileData] = useState(null)
  const [analysedData, setAnalysedData] = useState(null)

  const handleFileUpload = (data) => {
    setFileData(data)
  }
  // @@@@@ To do @@@@@ 
  if (analysedData) {
    return (
      <div>
        <p>{analysedData.analysisObj.monthlySavings}</p>
        <p>hi</p>
        <button>
          Reset
        </button>
      </div>
    )
  }

  return (
    <div className='App'>
      <GetUserInfo userData={userData} setUserData={setUserData} />
      {!fileData ? ( 
        <FileUploader onFileUpload={handleFileUpload} /> )
         : (
          <DataAnalyser 
            fileData={fileData}
            userData={userData}
            setAnalysedData={setAnalysedData}
            analysedData={analysedData}
          />
         )}
    </div>
  );
};

export default App;
