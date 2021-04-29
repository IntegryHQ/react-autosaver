import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { AutoSaveContext } from './AutoSaveContext';

interface RenderPropType {
  autosaveDelay?: number;
}

interface AutoSaveProps {
  onAutosaveTriggered?: () => void;
  autosaveDelay?: number;
  children: (args: RenderPropType) => ReactNode;
}

const AutoSave: React.FC<AutoSaveProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { children, onAutosaveTriggered = () => {}, autosaveDelay = 0 } = props;
  const autosaveRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const autosaveRefCopy = autosaveRef.current;
    return () => {
      if (autosaveRefCopy) clearTimeout(autosaveRefCopy);
    };
  }, []);

  const triggerAutoSave = useCallback(() => {
    autosaveRef.current = setTimeout(() => {
      console.log('Triggering autosave');
      onAutosaveTriggered();
    }, autosaveDelay);
  }, [onAutosaveTriggered, autosaveDelay]);

  return (
    <AutoSaveContext.Provider
      value={{
        triggerAutoSave,
      }}
    >
      {children({})}
    </AutoSaveContext.Provider>
  );
};
export default AutoSave;
