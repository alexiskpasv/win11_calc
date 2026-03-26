export const programmerActions = (set, get) => ({
  // The internal value is always stored as a BigInt string
  value: "0",
  wordSize: 64, // 64 (QWORD), 32 (DWORD), 16 (WORD), 8 (BYTE)

  setProgrammerValue: (newVal) => {
    // Ensure we mask the value based on the current Word Size (e.g., 0xFF for BYTE)
    const mask = (1n << BigInt(get().wordSize)) - 1n;
    const maskedValue = BigInt(newVal) & mask;
    set({ value: maskedValue.toString() });
  },

  // Conversion Utilities
  getFormats: () => {
    const val = BigInt(get().value);
    return {
      hex: val.toString(16).toUpperCase(),
      dec: val.toString(10),
      oct: val.toString(8),
      bin: val.toString(2).padStart(get().wordSize, '0').replace(/(.{4})/g, '$1 ')
    };
  }
});