// Caleta del Sol 3D — Seeded PRNG
export function createPRNG(seed = 1337) {
  let s = seed >>> 0;
  return function() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
