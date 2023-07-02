import React, { useState, useRef } from 'react';
import CSVParser from './components/CSVParser';
import UserInfo from './components/UserInfo';

const App = () => {
  const [selectedZone, setSelectedZone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const zoneSelectRef = useRef(null);
  const paymentMethodRef = useRef(null);

  const handleFormReset = () => {
    setSelectedZone('');
    setPaymentMethod('');
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
      />
      <CSVParser
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleFormReset={handleFormReset}
      />
    </div>
  );
};

export default App;
