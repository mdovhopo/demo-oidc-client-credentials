import fs from 'fs/promises';

/**
 * @implements {import("oidc-provider").Adapter}
 */

function grantKeyFor(id) {
  return `grant:${id}`;
}

function sessionUidKeyFor(id) {
  return `sessionUid:${id}`;
}

function userCodeKeyFor(userCode) {
  return `userCode:${userCode}`;
}

const storage = new Map();

const dbSeed = JSON.parse(await fs.readFile('database-seed.json', 'utf-8'));

Object.entries(dbSeed).forEach(([key, value]) => {
  storage.set(key, value);
});

export class Adapter {
  constructor(model) {
    console.log('Adapter.model:', model);
    this.model = model;
  }

  key(id) {
    return `${this.model}:${id}`;
  }

  async destroy(id) {
    console.log('Adapter.destroy:', id);
    const key = this.key(id);
    storage.delete(key);
  }

  async consume(id) {
    console.log('Adapter.consume:', id);
    storage.get(this.key(id)).consumed = epochTime();
  }

  /**
   * 
   * @param {string} id 
   * @returns {Promise<import('oidc-provider').AdapterPayload | undefined>}
   */

  async find(id) {
    console.log('Adapter.find:', id, storage.get(this.key(id)));
    return storage.get(this.key(id));
  }

  async findByUid(uid) {
    console.log('Adapter.findByUid:', uid);
    const id = storage.get(sessionUidKeyFor(uid));
    return this.find(id);
  }

  async findByUserCode(userCode) {
    console.log('Adapter.findByUserCode:', userCode);
    const id = storage.get(userCodeKeyFor(userCode));
    return this.find(id);
  }

  async upsert(id, payload, expiresIn) {
    console.log('Adapter.upsert:', id, payload, expiresIn);
    const key = this.key(id);

    if (this.model === 'Session') {
      storage.set(sessionUidKeyFor(payload.uid), id, expiresIn * 1000);
    }

    const { grantId, userCode } = payload;
    if (grantable.has(this.model) && grantId) {
      const grantKey = grantKeyFor(grantId);
      const grant = storage.get(grantKey);
      if (!grant) {
        storage.set(grantKey, [key]);
      } else {
        grant.push(key);
      }
    }

    if (userCode) {
      storage.set(userCodeKeyFor(userCode), id, expiresIn * 1000);
    }

    storage.set(key, payload, expiresIn * 1000);
  }

  async revokeByGrantId(grantId) {
    console.log('Adapter.revokeByGrantId:', grantId);
    // eslint-disable-line class-methods-use-this
    const grantKey = grantKeyFor(grantId);
    const grant = storage.get(grantKey);
    if (grant) {
      grant.forEach((token) => storage.delete(token));
      storage.delete(grantKey);
    }
  }
}
