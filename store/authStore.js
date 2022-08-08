import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set) => ({
  logged: null,
  darkMode: false,
  passwordIssue: false,
  emailIssue: false,
  noEmail: false,

  submitLogin: async (email, password) => {
    const { data } = await axios.post(`/api/auth/login`, {
      email: email,
      password: password,
    });
    if (data[0]._id) {
      set({ noEmail: false });
      set({ passwordIssue: false });
      set({ logged: data[0] });
    } else if (data === "pwd") {
      set({ passwordIssue: true });
    } else if (data === "null") {
      set({ noEmail: true });
    }
  },
  submitLogout: async () => {
    const { data } = await axios.get("/api/auth/logout");
    window.location.reload();
    set({ logged: data });
  },
  changeMode: async (id, mode) => {
    const { data } = await axios.put(`/api/users/dark`, {
      id: id,
      mode: mode,
    });
    set((state) => ({
      logged: { ...state.logged, darkMode: data.darkMode },
    }));
  },
});

const useAuthState = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthState;
