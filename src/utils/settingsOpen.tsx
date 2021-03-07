import React from 'react';

const SettingsContext = React.createContext({
  settingsOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettingsOpen: (setOpen: boolean) => {},
});

export default SettingsContext;
