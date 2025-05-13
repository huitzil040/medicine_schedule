import React, { useState } from 'react';

const AddMedication = ({ addMedication }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !time) return alert('薬名と時間を入力してください');
    addMedication({ name, time, taken: false });
    setName('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="medication-form">
      <div className="form-group">
        <label htmlFor="name">薬の名前</label>
        <input
          type="text"
          id="name"
          placeholder="例: アセトアミノフェン"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">服薬時間</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button type="submit" className="save-btn">登録</button>
    </form>
  );
};

export default AddMedication;
