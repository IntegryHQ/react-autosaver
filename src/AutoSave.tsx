import React, { useCallback, useEffect, useRef } from 'react';
import { useInterval } from './useInterval';
import { AutoSaveContext } from './AutoSaveContext';

interface AutoSaveProps {
  isAutosaving: boolean;
  onAutosaveTriggered?: () => void;
  autosaveDelay?: number;
  enableAutosaveLoop?: boolean;
  autosaveLoopInterval?: number;
}

const AutoSave: React.FC<AutoSaveProps> = (props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAutosaveTriggered = () => {},
    enableAutosaveLoop = false,
    autosaveDelay = 0,
    autosaveLoopInterval = 3000,
    isAutosaving = false,
    children,
  } = props;
  const autosaveRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const autosaveRefCopy = autosaveRef.current;
    return () => {
      if (autosaveRefCopy) clearTimeout(autosaveRefCopy);
    };
  }, []);

  useInterval(
    () => {
      // inform parent that autosave should occur if it isn't already
      if (!isAutosaving) onAutosaveTriggered();
    },
    enableAutosaveLoop ? autosaveLoopInterval : null,
  );

  const triggerAutoSave = useCallback(() => {
    autosaveRef.current = setTimeout(() => {
      onAutosaveTriggered();
    }, autosaveDelay);
  }, [onAutosaveTriggered, autosaveDelay]);

  return (
    <AutoSaveContext.Provider
      value={{
        triggerAutoSave,
      }}
    >
      {children}
    </AutoSaveContext.Provider>
  );
};
export default AutoSave;
