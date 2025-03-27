import React, { createContext, useState, useEffect, useContext } from 'react';

// Tạo context cho trạng thái isMorning
const MorningContext = createContext();

export const useMorning = () => useContext(MorningContext); // Hook để sử dụng context

export const MorningProvider = ({ children }) => {
  const [isMorning, setIsMorning] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsMorning(true); // Buổi sáng từ 6h đến 18h
    } else {
      setIsMorning(false); // Buổi tối từ 18h đến 6h sáng
    }
  }, []);

  return (
    <MorningContext.Provider value={isMorning}>
      {children}
    </MorningContext.Provider>
  );
};
