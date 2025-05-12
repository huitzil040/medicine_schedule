import React from 'react';

const MedicationHistory = ({ medicationHistory }) => {
  return (
    <div>
      <h3>服薬履歴</h3>
      <ul>
        {medicationHistory.map((med, index) => (
          <li key={index}>
            <strong>{med.name}</strong> - {med.time} - 服薬完了: {med.takenTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationHistory;
