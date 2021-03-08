import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import ModalComponent from './components/ModalComponent';
import SettingsModal from './components/SettingsModal';
import Splitter from './components/Splitter';

import SettingsContext from './utils/settingsOpen';

export default function App() {
  const [token, setToken] = useState('');
  const [canvasUrl, setCanvasUrl] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const value = { settingsOpen, setSettingsOpen };

  useEffect(() => {
    (async () => {
      const canvasTokenResponse = await ipcRenderer.invoke('getCanvasToken');
      setToken(canvasTokenResponse);
      const canvasUrlResponse = await ipcRenderer.invoke('getCanvasUrl');
      setCanvasUrl(canvasUrlResponse);
      if (!canvasTokenResponse || !canvasUrlResponse) {
        setSettingsOpen(true);
      }
    })();
  }, [settingsOpen]);

  return (
    <div>
      <SettingsContext.Provider value={value}>
        <ModalComponent
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        >
          <SettingsModal onApply={() => setSettingsOpen(false)} />
        </ModalComponent>
        {canvasUrl && token && <Splitter token={token} canvasUrl={canvasUrl} />}
      </SettingsContext.Provider>
    </div>
  );
}
