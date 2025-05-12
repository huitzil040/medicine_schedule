import { useState, useEffect } from 'react';

const STORAGE_KEY = 'medications';
const HISTORY_KEY = 'medicationHistory';

export function useMedications() {
  const [medications, setMedications] = useState([]); // 現在のタスクリスト
  const [medicationHistory, setMedicationHistory] = useState([]); // 履歴リスト

  // ローカルストレージからデータを取得
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      setMedications(JSON.parse(stored));
    }
    if (storedHistory) {
      setMedicationHistory(JSON.parse(storedHistory));
    }

    // 日が変わったかチェックし、タスクをリセット
    const today = new Date().toLocaleDateString();
    const lastDate = localStorage.getItem('lastDate');

    // 日付が変わっていたらタスクをリセット
    if (lastDate !== today) {
      resetTasksForNewDay();
    }
    //テスト用
    resetTasksForNewDay();
    // 通知の許可をリクエスト
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // 新しい薬を追加
  const addMedication = (medication) => {
    const newMedication = {
      ...medication,
      taken: false,
      date: new Date().toLocaleDateString(),
    };

    setMedications((prevMedications) => {
      const newMedications = [...prevMedications, newMedication];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMedications));
      return newMedications;
    });
  };

  // 薬を削除
  const deleteMedication = (index) => {
    setMedications((prevMedications) => {
      const newMedications = prevMedications.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMedications));
      return newMedications;
    });
  };

  const updateMedication = (index, updatedMed) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], ...updatedMed };
    setMedications(updated);
    localStorage.setItem('medications', JSON.stringify(updated));
  };

  // 薬を服薬済みとしてマーク
  const markAsTaken = (index) => {
    const newMedications = [...medications];
    const currentTime = new Date().toLocaleString();

    newMedications[index].taken = true;
    newMedications[index].takenTime = currentTime;

    // 履歴に追加
    const updatedHistory = [...medicationHistory, newMedications[index]];
    setMedicationHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

    // 現在のタスクリストから削除
    const updatedMedications = newMedications.filter((_, i) => i !== index);
    console.log(updatedMedications);
    setMedications(updatedMedications);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMedications));
  };

  // 日が変わったらタスクをリセットする
  const resetTasksForNewDay = () => {
    const today = new Date().toLocaleDateString();
    const storedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

    // まだ服用していない薬のみ再設定したいなら、以下のような条件も加えられます：
    const unTakenToday = storedHistory.filter(item => item.date !== today && item.taken);
    //const unTakenToday = storedHistory.filter(item => item.taken);

    setMedications(unTakenToday);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unTakenToday));
    localStorage.setItem('lastDate', today);
  };

  return { medications, medicationHistory, addMedication, deleteMedication, markAsTaken, updateMedication };
}
