import React, { useState } from 'react';

const MList = ({ MList }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(MList);
  return (
    <div className="history-section">
      <h2>現在服用中の薬</h2>
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-history-btn">
        {isOpen ? '一覧を閉じる' : '一覧を表示'}
      </button>

      {isOpen && (
        <ul className="history-list">
          {MList.length === 0 ? (
            <li>履歴はまだありません。</li>
          ) : (
            MList.map((item, index) => (
              <li key={index} className="history-item">
                <strong>{item.name}</strong>(登録時間 : {item.time}）
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MList;
