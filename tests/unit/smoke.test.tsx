import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../src/config/site';

describe('Phase 0 Smoke Tests', () => {
  it('siteConfig brand name is Lanthera Health', () => {
    expect(siteConfig.brandName).toBe('Lanthera Health');
  });
});
