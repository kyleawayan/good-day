import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import ModalComponent from './components/ModalComponent';
import SettingsModal from './components/SettingsModal';

import Splitter from './components/Splitter';

export default function App() {
  const [token, setToken] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    ipcRenderer
      .invoke('getCanvasToken')
      .then((retrievedToken) => {
        if (retrievedToken) {
          setToken(retrievedToken);
        } else {
          setToken('nah');
          setSettingsOpen(true);
        }
      })
      .catch(() => {
        setToken('nah');
        setSettingsOpen(true);
      });
  }, [settingsOpen]);

  if (!token) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <ModalComponent
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <SettingsModal onApply={() => setSettingsOpen(false)} />
      </ModalComponent>
      <Splitter token={token} />
    </div>
  );
}
