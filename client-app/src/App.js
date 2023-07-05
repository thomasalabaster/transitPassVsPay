import React, { useState, useRef } from 'react';
import CSVParser from './components/CSVParser';
import UserInfo from './components/UserInfo';

const App = () => {
  const [selectedZone, setSelectedZone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const zoneSelectRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const [isConcession, setIsConcession] = useState("adult")

  const handleFormReset = () => {
    setSelectedZone('');
    setPaymentMethod('');
    setIsConcession("adult")
    if (zoneSelectRef.current) {
      zoneSelectRef.current.value = '';
    }
    if (paymentMethodRef.current) {
      paymentMethodRef.current.value = '';
    }
  };

  return (
    <div className='App'>
      <UserInfo
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleFormReset={handleFormReset}
        zoneSelectRef={zoneSelectRef}
        paymentMethodRef={paymentMethodRef}
        isConcession={isConcession}
        setIsConcession={setIsConcession}
      />
      <CSVParser
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleFormReset={handleFormReset}
        isConcession={isConcession}
      />
    </div>
  );
};

export default App;
