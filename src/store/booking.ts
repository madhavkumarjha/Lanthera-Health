import { create } from 'zustand';

interface BookingStore {
  department: string | null;
  doctorId: string | null;
  slot: string | null;
  step: number;
  setDepartment: (dept: string | null) => void;
  setDoctorId: (doctorId: string | null) => void;
  setSlot: (slot: string | null) => void;
  setStep: (step: number) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  department: null,
  doctorId: null,
  slot: null,
  step: 1,
  setDepartment: (department) => set({ department }),
  setDoctorId: (doctorId) => set({ doctorId }),
  setSlot: (slot) => set({ slot }),
  setStep: (step) => set({ step }),
}));
