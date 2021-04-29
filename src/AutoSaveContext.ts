import React, { useContext } from 'react';

export const AutoSaveContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  triggerAutoSave: () => {},
});

export const useAutoSaveContext = (): {
  triggerAutoSave: () => void;
} => {
  const autoSaveContext = useContext(AutoSaveContext);

  return {
    triggerAutoSave: autoSaveContext.triggerAutoSave,
  };
};
