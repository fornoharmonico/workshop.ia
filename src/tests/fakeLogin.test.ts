import { describe, it, expect, beforeEach } from 'vitest';

describe('Autenticação Fake de Prototipação (admin / segredo)', () => {
  const FAKE_AUTH_STORAGE_KEY = 'oforno_webapp_fake_auth';
  let memoryStorage: Record<string, string> = {};

  beforeEach(() => {
    memoryStorage = {};
  });

  const checkCredentials = (_user: string, pass: string): boolean => {
    const normalizedPass = pass.trim();
    return normalizedPass === 'segredo';
  };

  it('deve aprovar login com "admin" e senha "segredo"', () => {
    expect(checkCredentials('admin', 'segredo')).toBe(true);
  });

  it('deve aprovar login com qualquer outro nome ou equipe com senha "segredo"', () => {
    expect(checkCredentials('Lucas', 'segredo')).toBe(true);
    expect(checkCredentials('Equipe Beta', 'segredo')).toBe(true);
    expect(checkCredentials('Facilitador', 'segredo')).toBe(true);
    expect(checkCredentials('', 'segredo')).toBe(true);
  });

  it('deve rejeitar senhas incorretas ou em branco independentemente do nome informado', () => {
    expect(checkCredentials('admin', '123456')).toBe(false);
    expect(checkCredentials('admin', '')).toBe(false);
    expect(checkCredentials('Equipe Beta', 'incorreto')).toBe(false);
  });

  it('deve simular gravação e limpeza do estado de autenticação no storage', () => {
    memoryStorage[FAKE_AUTH_STORAGE_KEY] = 'true';
    expect(memoryStorage[FAKE_AUTH_STORAGE_KEY]).toBe('true');

    delete memoryStorage[FAKE_AUTH_STORAGE_KEY];
    expect(memoryStorage[FAKE_AUTH_STORAGE_KEY]).toBeUndefined();
  });
});
