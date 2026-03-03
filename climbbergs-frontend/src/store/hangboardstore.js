import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useHangboardStore = create(
    devtools((set, get) => ({
        // State
        grips: [],
        selectedGripId: null,
        selectedGripType: null,
        viewMode: '2D', // '2D' or '3D'
        snapToGrid: true,
        gridSize: 25,
        symmetryMode: false,
        layers: {
            background: [],
            foreground: [],
        },
        currentLayer: 'foreground',

        // Undo/Redo state
        history: {
            past: [],
            future: [],
        },

        // Actions
        addGrip: (grip) => set((state) => {
            const newState = { grips: [...state.grips, grip] };
            return {
                ...newState,
                history: {
                    past: [...state.history.past, { grips: state.grips }],
                    future: [],
                },
            };
        }),

        updateGrip: (id, updates) => set((state) => {
            const newState = {
                grips: state.grips.map(g =>
                    g.id === id ? { ...g, ...updates } : g
                ),
            };
            return {
                ...newState,
                history: {
                    past: [...state.history.past, { grips: state.grips }],
                    future: [],
                },
            };
        }),

        deleteGrip: (id) => set((state) => {
            const newState = {
                grips: state.grips.filter(g => g.id !== id),
                selectedGripId: state.selectedGripId === id ? null : state.selectedGripId,
            };
            return {
                ...newState,
                history: {
                    past: [...state.history.past, { grips: state.grips }],
                    future: [],
                },
            };
        }),

        duplicateGrip: (id) => set((state) => {
            const original = state.grips.find(g => g.id === id);
            if (!original) return state;

            const duplicate = {
                ...original,
                id: Date.now(),
                x: original.x + 30,
                y: original.y + 30,
            };

            const newState = { grips: [...state.grips, duplicate] };
            return {
                ...newState,
                history: {
                    past: [...state.history.past, { grips: state.grips }],
                    future: [],
                },
            };
        }),

        clearAll: () => set((state) => ({
            grips: [],
            selectedGripId: null,
            history: {
                past: [...state.history.past, { grips: state.grips }],
                future: [],
            },
        })),

        selectGrip: (id) => set({ selectedGripId: id }),

        setSelectedGripType: (type) => set({ selectedGripType: type }),

        toggleViewMode: () => set((state) => ({
            viewMode: state.viewMode === '2D' ? '3D' : '2D',
        })),

        toggleSnapToGrid: () => set((state) => ({
            snapToGrid: !state.snapToGrid,
        })),

        toggleSymmetry: () => set((state) => ({
            symmetryMode: !state.symmetryMode,
        })),

        setLayer: (layer) => set({ currentLayer: layer }),

        // Undo/Redo actions
        undo: () => set((state) => {
            if (state.history.past.length === 0) return state;

            const previous = state.history.past[state.history.past.length - 1];
            const newPast = state.history.past.slice(0, -1);

            return {
                ...previous,
                history: {
                    past: newPast,
                    future: [{ grips: state.grips }, ...state.history.future],
                },
            };
        }),

        redo: () => set((state) => {
            if (state.history.future.length === 0) return state;

            const next = state.history.future[0];
            const newFuture = state.history.future.slice(1);

            return {
                ...next,
                history: {
                    past: [...state.history.past, { grips: state.grips }],
                    future: newFuture,
                },
            };
        }),

        canUndo: () => get().history.past.length > 0,
        canRedo: () => get().history.future.length > 0,
    }))
);

// Helper hooks for undo/redo
export const useUndo = () => useHangboardStore((state) => state.undo);
export const useRedo = () => useHangboardStore((state) => state.redo);
export const useCanUndo = () => useHangboardStore((state) => state.canUndo());
export const useCanRedo = () => useHangboardStore((state) => state.canRedo());

export default useHangboardStore;