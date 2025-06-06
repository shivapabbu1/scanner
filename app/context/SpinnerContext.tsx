import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SpinnerContextProps {
  spinnerVisible: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextProps | undefined>(undefined);

export const SpinnerProvider = ({ children }: { children: ReactNode }) => {
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const showSpinner = () => setSpinnerVisible(true);
  const hideSpinner = () => setSpinnerVisible(false);

  return (
    <SpinnerContext.Provider value={{ spinnerVisible, showSpinner, hideSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};
