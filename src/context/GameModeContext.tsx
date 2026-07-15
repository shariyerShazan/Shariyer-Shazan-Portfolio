"use client";

import React, { createContext, useContext, useState } from "react";

interface GameModeContextType {
  isGameActive: boolean;
  setIsGameActive: (val: boolean) => void;
}

const GameModeContext = createContext<GameModeContextType>({
  isGameActive: false,
  setIsGameActive: () => {},
});

export const GameModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <GameModeContext.Provider value={{ isGameActive, setIsGameActive }}>
      {children}
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => useContext(GameModeContext);
