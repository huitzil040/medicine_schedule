import React, { useState } from 'react';

const MList = ({ medList, updateMedication, deleteMedication }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleUpdateMedication = (index, newName, newTime) => {
    updateMedication(index, { name: newName, time: newTime });
    setEditingIndex(null);
    setNewName('');
    setNewTime('');
  };

  const toggleEdit = (index, currentName, currentTime) => {
    setEditingIndex(index);
    setNewName(currentName);
    setNewTime(currentTime);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(`${medList[index].name}のデータを削除しますか？`);
    if (confirmed) deleteMedication(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewName('');
    setNewTime('');
  };

  const toggleDetails = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className="medication-history">
      <h2>現在使用中の薬</h2>
      <button onClick={() => setIsOpen(!isOpen)} className="details-btn">
        {isOpen ? '閉じる' : '一覧を表示'}
      </button>

      {isOpen && (
        <ul>
          {medList.length === 0 ? (
            <li>現在、服薬中の薬はありません。</li>
          ) : (
            medList.map((item, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                    <div className="button-group">
                      <button className="save-btn" onClick={() => handleUpdateMedication(index, newName, newTime)}>更新</button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>キャンセル</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{item.name}</strong>（{item.time}）
                      {selectedIndex === index && (
                        <div className="medication-details">
                          <p><strong>名前:</strong> {item.name}</p>
                          <p><strong>服薬時間:</strong> {item.time}</p>
                        </div>
                      )}
                    </div>
                    <div className="button-group">
                      <button className="edit-btn" onClick={() => toggleEdit(index, item.name, item.time)}>編集</button>
                      <button className="details-btn" onClick={() => toggleDetails(index)}>
                        {selectedIndex === index ? '非表示' : '詳細'}
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}>削除</button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MList;
