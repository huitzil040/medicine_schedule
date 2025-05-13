import React from 'react';
import AddMedication from './AddMedication';
import MedicationList from './MedicationList';
import MedicationHistory from './MedicationHistory';
import MList from './MList';
import { NotificationManager } from './Notification';
import { useMedications } from './useMedication';
import './app.css';

const App = () => {
  const { medications, medicationHistory, addMedication, deleteMedication, markAsTaken, updateMedication, medList } = useMedications();

  return (
    <div className="container">
      <h1>My Medicine</h1>
      <AddMedication addMedication={addMedication} />
      <div>
        <h2>今日の服薬タスク</h2>
        <MedicationList
          medications={medications}
          deleteMedication={deleteMedication}
          markAsTaken={markAsTaken}
          updateMedication={updateMedication}
        />
      </div>
      <MedicationHistory medicationHistory={medicationHistory} />
      <MList MList={medList} />
      <NotificationManager medications={medications} />
    </div>
  );
};

export default App;
