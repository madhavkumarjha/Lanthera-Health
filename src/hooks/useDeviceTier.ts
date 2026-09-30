import { useState, useEffect } from 'react';

export type DeviceTier = 'A' | 'B' | 'C';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('A');

  useEffect(() => {
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setTier('B');
    } else if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
      setTier('B');
    }
  }, []);

  return tier;
}
