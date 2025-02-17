import React, { useState, useEffect } from 'react';
import { ContractViewer } from './components/ContractViewer';

function App() {
  const [contractData, setContractData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/input.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load contract data');
        }
        return response.json();
      })
      .then(data => {
        setContractData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        Loading contract data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        color: 'red'
      }}>
        Error: {error}
      </div>
    );
  }

  return (

    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '32px'
    }}>
      <ContractViewer data={contractData} />
    </div>
  );
}

export default App;