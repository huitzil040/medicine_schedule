import React, { useState } from 'react';
import { FaTrashAlt, FaCheckCircle, FaInfoCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const MedicationList = ({ medications, deleteMedication, markAsTaken, updateMedication }) => {
  // 詳細表示を管理するステート
  const [openIndex, setOpenIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTime, setEditTime] = useState('');

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const startEditing = (index, med) => {
    setEditIndex(index);
    setEditName(med.name);
    setEditTime(med.time);
  };

  const saveEdit = (index) => {
    updateMedication(index, { name: editName.trim(), time: editTime });
    setEditIndex(null);
  };

  return (
    <div>
      {medications.length === 0 ? (
        <p>素晴らしい！おくすりは一掃された！</p>
      ) : (
        <ul>
          {medications.map((med, index) => (
            <li key={index} className="medication-item">
              {editIndex === index ? (
                <div style={{ flexGrow: 1 }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="薬の名前"
                    style={{ marginRight: '10px' }}
                  />
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <strong>{med.name}</strong> - {med.time}
                  <button onClick={() => toggleDetails(index)} className="details-btn">
                    <FaInfoCircle style={{ marginRight: '5px' }} />
                    {openIndex === index ? '詳細を隠す' : '詳細を表示'}
                  </button>
                </div>
              )}

              <div>
                {editIndex === index ? (
                  <>
                    <button onClick={() => saveEdit(index)} className="mark-btn">
                      <FaSave style={{ marginRight: '5px' }} />
                      保存
                    </button>
                    <button onClick={() => setEditIndex(null)} className="delete-btn">
                      <FaTimes style={{ marginRight: '5px' }} />
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(index, med)} className="details-btn">
                      <FaEdit style={{ marginRight: '5px' }} />
                      編集
                    </button>
                    <button
                      onClick={() => {
                        const confirmed = window.confirm(`${med.name}のデータを削除してもよろしいですか？`);
                        if (confirmed) deleteMedication(index);
                      }}
                      className="delete-btn"
                    >
                      <FaTrashAlt style={{ marginRight: '5px' }} />
                      削除
                    </button>
                  </>
                )}
              </div>

               {/* 詳細情報の表示 */}
               {openIndex === index && !editIndex && (
                    <div className="medication-details">
                      <p><strong>服薬時間: </strong>{med.time}</p>
                      <p><strong>服薬開始日: </strong>{med.date}</p>
                      <button
                        onClick={() => markAsTaken(index)}
                        className="mark-btn"
                        //disabled={med.taken}
                      >
                        <FaCheckCircle style={{ marginRight: '5px' }} />
                        {med.taken ? '服薬完遂' : '服薬完了'}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default MedicationList;
