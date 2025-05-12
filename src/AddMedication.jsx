import React, { useState } from 'react';

const AddMedication = ({ addMedication }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !time) {
      setError('薬の名前と時間を入力してください');
      return;
    }

    setError('');

    addMedication({ name: name.trim(), time });

    setName('');
    setTime('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="薬の名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddMedication;
