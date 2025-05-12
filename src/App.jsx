import  { useState, useEffect } from 'react'

function App() {
 const [schedules, setSchedules] = useState(() => {
   const stored = localStorage.getItem('schedules');
   return stored ? JSON.parse(stored) : [];
 });

 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');

 useEffect(() => {
   localStorage.setItem('schedules', JSON.stringify(schedules));
 }, [schedules]);

 const addSchedule = () => {
   if (title && date) {
     setSchedules([...schedules, { id: Date.now(), title, date }]);
     setTitle('');
     setDate('');
   }
 };

 const deleteSchedule = (id) => {
   setSchedules(schedules.filter(item => item.id !== id));
 };

 return (
   <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
     <h1>📆 スケジュール管理</h1>
     <input
       type="text"
       placeholder="タイトル"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
     />
     <input
       type="date"
       value={date}
       onChange={(e) => setDate(e.target.value)}
     />
     <button onClick={addSchedule}>追加</button>

     <ul>
       {schedules.map((item) => (
         <li key={item.id}>
           {item.date} - {item.title}
           <button onClick={() => deleteSchedule(item.id)}>削除</button>
         </li>
       ))}
     </ul>
   </div>
 );
}

export default App;
