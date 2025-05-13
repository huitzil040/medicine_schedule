import React, { useState } from 'react';
import {
  FaTrashAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const MedicationList = ({ medications, deleteMedication, markAsTaken }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="medication-history">

      {medications.length === 0 ? (
        <p>素晴らしい！おくすりは一掃された！</p>
      ) : (
        <ul>
          {medications.map((med, index) => (
            <li key={index} className={`medication-item ${med.taken ? 'taken' : ''}`}>
              <div className="medication-info">
                <strong>{med.name}</strong> <span>（{med.time}）</span>
              </div>

              {openIndex === index && (
                <div className="medication-details">
                  <p><strong>名前:</strong> {med.name}</p>
                  <p><strong>服薬時間:</strong> {med.time}</p>
                  <p><strong>状態:</strong> {med.taken ? '服薬済み' : '未服薬'}</p>
                </div>
              )}

              <div className="button-group">
                <button
                  className="mark-btn"
                  onClick={() => markAsTaken(index)}
                >
                  <FaCheckCircle />
                  {med.taken ? '服薬完遂' : '服薬完了'}
                </button>

                <button
                  className="details-btn"
                  onClick={() => toggleDetails(index)}
                >
                  <FaInfoCircle />
                  {openIndex === index ? '閉じる' : '詳細'}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    const confirmed = window.confirm(`${med.name}のデータを削除してもよろしいですか？`);
                    if (confirmed) deleteMedication(index);
                  }}
                >
                  <FaTrashAlt />
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationList;
