import { usePrefsStore } from '../store/prefs';

export function useMotionPref() {
  const motion = usePrefsStore((s) => s.motion);
  const calmMode = usePrefsStore((s) => s.calmMode);

  const isReduced = motion === 'reduced' || motion === 'off' || calmMode;
  return { motion, calmMode, isReduced };
}
