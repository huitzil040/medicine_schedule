import { useEffect } from 'react';

const sendNotification = (medication) => {
  if (Notification.permission === 'granted') {
    new Notification(`薬を飲む時間です！: ${medication.name}`);
  }
};

export const NotificationManager = ({ medications }) => {
  useEffect(() => {
    // 定期的に薬の時間をチェック
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      medications.forEach((med) => {
        const [hour, minute] = med.time.split(':');
        if (
          currentTime.getHours() == hour &&
          currentTime.getMinutes() == minute
        ) {
          sendNotification(med);
        }
      });
    }, 60000); // 1分ごとにチェック

    return () => clearInterval(intervalId);
  }, [medications]);

  return null;
};
