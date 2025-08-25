import liff from '@line/liff';

let initialized = false;

export async function initLiff() {
  if (!initialized) {
    await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
    initialized = true;
  }
  return liff;
}
