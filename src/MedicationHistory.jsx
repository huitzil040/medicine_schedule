import React, { useState } from 'react';

const MedicationHistory = ({ medicationHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(medicationHistory);
  return (
    <div className="history-section">
      <h2>服薬履歴</h2>
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-history-btn">
        {isOpen ? '履歴を閉じる' : '履歴を表示'}
      </button>

      {isOpen && (
        <ul className="history-list">
          {medicationHistory.length === 0 ? (
            <li>履歴はまだありません。</li>
          ) : (
            medicationHistory.map((item, index) => (
              <li key={index} className="history-item">
                <strong>{item.name}</strong>（{item.takenTime} 服薬）
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MedicationHistory;
