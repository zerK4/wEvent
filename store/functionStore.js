import create from "zustand";
import axios from "axios";

const functionStore = create((set) => ({
  event: [],
  oneID: "",
  posts: [],
  users: [],
  guests: [],
  oneUser: {},
  isPosting: false,
  upComment: {},
  contracts: [],

  fetchEvent: async (id) => {
    const { data } = await axios.post(`/api/event/`, {
      eventId: id,
    });
    set({ event: data[0] });
  },
  fetchUser: async () => {
    const { data } = await axios.get(`/api/users/`);
    set({ users: data });
  },
  fetchGuests: async (wCode) => {
    const { data } = await axios.post(`/api/guests/get`, {
      wCode: wCode,
    });
    set({ guests: data });
  },
  addUser: async (wCode, name, location, phone, confirmation, provided) => {
    const { data } = await axios.post(`/api/guests/`, {
      wCode: wCode,
      name: name,
      location: location,
      phone: phone,
      confirmation: confirmation,
      provided: provided,
    });
    set((state) => ({
      guests: [...state.guests, data],
    }));
  },
  getOne: async (id) => {
    const { data } = await axios.post("/api/guests/getOne", {
      id: id,
    });
    set({ oneUser: data[0] });
    set({ oneID: id });
  },
  removeUser: async (id) => {
    const { data } = await axios.delete(`/api/guests`, {
      headers: {
        Authorization: "authorizationToken",
      },
      data: {
        source: id,
      },
    });
    set((state) => ({
      guests: state.guests.filter((user) => user._id !== id),
    }));
  },
  updateUser: async (userId, name, location, phone, confirmation, invited) => {
    const { data } = await axios.put(`/api/users/`, {
      userId: userId,
      name: name,
      location: location,
      phone: phone,
      confirmation: confirmation,
      invited: invited,
    });
    set({ oneUser: data[0] });
  },
  fetchPosts: async (wCode) => {
    const { data } = await axios.post(`/api/posts`, {
      wCode: wCode,
    });
    set({ posts: data });
  },
  newPost: async (wCode, user, upload, content, postDate) => {
    set({ isPosting: true });
    const { data } = await axios.post(`/api/posts/newPost/`, {
      wCode: wCode,
      user: user,
      upload: upload,
      content: content,
      postDate: postDate,
    });
    set((state) => ({
      posts: [data, ...state.posts],
    }));
    setTimeout(() => set({ isPosting: false }));
  },
  deletePost: async (id) => {
    const { data } = await axios.delete(`/api/posts`, {
      headers: {
        Authorization: "authorizationToken",
      },
      data: {
        source: id,
      },
    });
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== id),
    }));
  },
  postComment: async (postId, comment, userId, postDate) => {
    const { data } = await axios.post(`/api/comments/`, {
      postId: postId,
      comment: comment,
      userId: userId,
      postDate: postDate,
    });
    set({ posts: data });
  },
  fetchContracts: async (wCode) => {
    const { data } = await axios.post(`/api/contracts`, {
      wCode: wCode,
    });
    set({ contracts: data });
  },
  deleteContract: async (id) => {
    const { data } = await axios.delete(`/api/contracts`, {
      headers: {
        Authorization: "authorizationToken",
      },
      data: {
        source: id,
      },
    });
    set((state) => ({
      contracts: state.contracts.filter((contract) => contract._id !== id),
    }));
  },
  newContract: async (
    wCode,
    name,
    cNumber,
    service,
    phone,
    email,
    price,
    file
  ) => {
    const { data } = await axios.post(`/api/contracts/newContract/`, {
      wCode: wCode,
      name: name,
      cNumber: cNumber,
      service: service,
      phone: phone,
      email: email,
      price: price,
      file: file,
    });
    console.log(data);
    set((state) => ({
      contracts: [data, ...state.contracts],
    }));
  },
}));

export default functionStore;
