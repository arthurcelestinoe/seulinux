const KEY = "linux-distro-test:v1";
export const emptyState = () => ({
  step: 0,
  likert: {},
  hardware: {},
  details: {},
});
export function loadState() {
  try {
    return { ...emptyState(), ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return emptyState();
  }
}
export const saveState = (s) => localStorage.setItem(KEY, JSON.stringify(s));
export const clearState = () => localStorage.removeItem(KEY);
