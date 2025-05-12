import React from 'react';
import AddMedication from './AddMedication';
import MedicationList from './MedicationList';
import MedicationHistory from './MedicationHistory';
import { NotificationManager } from './Notification';
import { useMedications } from './useMedication';
import './app.css';

const App = () => {
  const { medications, medicationHistory, addMedication, deleteMedication, markAsTaken, updateMedication } = useMedications();

  return (
    <div className="container">
      <h1>Madication Reminder</h1>
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
      <NotificationManager medications={medications} />
    </div>
  );
};

export default App;
