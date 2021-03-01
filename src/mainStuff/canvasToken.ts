import * as keytar from 'keytar';

function storeToken(token: string): Promise<void> {
  return keytar.setPassword(
    'good-day-kylan-canvasToken',
    'canvas-token',
    token
  );
}

async function getToken(): Promise<string | null> {
  return keytar.getPassword('good-day-kylan-canvasToken', 'canvas-token');
}

function deleteToken(): Promise<boolean> {
  return keytar.deletePassword('good-day-kylan-canvasToken', 'canvas-token');
}

export { storeToken, getToken, deleteToken };
