import React, { useContext } from "react";

export const AutoSaveContext = React.createContext({
  triggerAutoSave: () => {},
});

export const useAutoSaveContext = () => {
  const autoSaveContext = useContext(AutoSaveContext);

  return {
    triggerAutoSave: autoSaveContext.triggerAutoSave,
  };
};
