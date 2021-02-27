import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

type SettingsProps = {
  onApply: any;
};

export default function SettingsModal({ onApply }: SettingsProps) {
  const [token, setToken] = useState('');

  const applyToken = () => {
    ipcRenderer.invoke('storeCanvasToken', token);
    onApply();
  };

  return (
    <div>
      <input
        type="text"
        name="canvas token"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />
      <button type="submit" onClick={applyToken}>
        apply
      </button>
    </div>
  );
}
