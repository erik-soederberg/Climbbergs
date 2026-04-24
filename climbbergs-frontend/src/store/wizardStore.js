import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useWizardStore = create(
  devtools((set, get) => ({
    // Wizard state
    currentStep: 1,

    // Step 1: Template selection
    selectedTemplate: null,

    // Step 2: Grip customization
    grips: [],
    selectedGripId: null,

    // Step 3: Material & finish
    material: "birch",
    finish: "matte",
    extras: [],

    // Pricing
    basePrice: 0,

    // Actions
    setStep: (step) => set({ currentStep: step }),

    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 3)
      })),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
      })),

    // Step 1 actions
    selectTemplate: (template) =>
      set({
        selectedTemplate: template,
        grips: template.grips.map((g, i) => ({
          ...g,
          id: Date.now() + i
        })),
        basePrice: template.basePrice
      }),

    // Step 2 actions
    updateGrip: (id, updates) =>
      set((state) => ({
        grips: state.grips.map((g) => (g.id === id ? { ...g, ...updates } : g))
      })),

    selectGrip: (id) => set({ selectedGripId: id }),

    deleteGrip: (id) =>
      set((state) => ({
        grips: state.grips.filter((g) => g.id !== id),
        selectedGripId:
          state.selectedGripId === id ? null : state.selectedGripId
      })),

    addGrip: (grip) =>
      set((state) => ({
        grips: [...state.grips, { ...grip, id: Date.now() }]
      })),

    // Step 3 actions
    setMaterial: (material) => set({ material }),
    setFinish: (finish) => set({ finish }),
    toggleExtra: (extra) =>
      set((state) => ({
        extras: state.extras.includes(extra)
          ? state.extras.filter((e) => e !== extra)
          : [...state.extras, extra]
      })),

    // Calculate total price
    getTotalPrice: () => {
      const state = get();
      let total = state.basePrice;

      // Material pricing
      const materialPrices = {
        birch: 0,
        walnut: 400,
        concrete: 200
      };
      total += materialPrices[state.material] || 0;

      // Finish pricing
      const finishPrices = {
        matte: 0,
        oiled: 100,
        untreated: -50
      };
      total += finishPrices[state.finish] || 0;

      // Extras pricing
      const extraPrices = {
        "wall-mount": 199,
        "training-guide": 0
      };
      state.extras.forEach((extra) => {
        total += extraPrices[extra] || 0;
      });

      return total;
    },

    // Reset wizard
    reset: () =>
      set({
        currentStep: 1,
        selectedTemplate: null,
        grips: [],
        selectedGripId: null,
        material: "birch",
        finish: "matte",
        extras: [],
        basePrice: 0
      })
  }))
);

export default useWizardStore;
