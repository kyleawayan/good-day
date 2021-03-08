import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import styles from '../styles/Intro.module.css';

type SettingsProps = {
  onApply: any;
};

export default function SettingsModal({ onApply }: SettingsProps) {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');

  const applyToken = () => {
    ipcRenderer.invoke('storeCanvasToken', token);
    ipcRenderer.invoke('storeCanvasUrl', url);
    onApply();
  };

  const reset = () => {
    ipcRenderer.invoke('deleteCanvasUrl');
    ipcRenderer.invoke('deleteCanvasToken');
  };

  return (
    <div>
      <div className={styles.intro}>
        <h1>Welcome to Good Day!</h1>
        <p>Please follow these steps to setup your Canvas.</p>
      </div>
      <br />
      <div className={styles.step}>
        <h2>1</h2>
        <p>
          Please enter your school&apos;s Canvas URL. You can do this by going
          to your school&apos;s Canvas website, and copying the main address.
          For example, &quot;canvas.ucmerced.edu&quot;. Please do not include
          any additional slashes.
        </p>
      </div>
      <input
        type="url"
        name="canvas token"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <div className={styles.step}>
        <h2>2</h2>
        <p>
          Next, you will need to create an account token. You can create one by
          going to the top right corner, clicking on your profile picture, and
          going to &quot;Settings&quot;. Scroll down to &quot;Approved
          Integrations&quot; and click on &quot;New Access Token&quot;. Give it
          any purpose name and any expiration date. Make sure to keep this a
          secret! This controls your account! Your token will be encrypted.
        </p>
      </div>
      <input
        type="password"
        name="canvas token"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />
      <div className={styles.step}>
        <h2>3</h2>
        <p>Click apply!</p>
      </div>
      <button type="submit" onClick={applyToken}>
        apply
      </button>
      <button
        type="button"
        onClick={reset}
        style={{ position: 'absolute', bottom: 20, left: 20 }}
      >
        reset
      </button>
    </div>
  );
}
