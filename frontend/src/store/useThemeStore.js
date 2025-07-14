import { create } from "zustand";

const useThemeStore = create((set) => ({
	theme: localStorage.getItem("conversate-theme") || "forest",
	setTheme: (theme) => {
		localStorage.setItem("conversate-theme", theme);
		set({ theme });
	},
}));

export default useThemeStore;
