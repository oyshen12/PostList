import { StateType } from "./state";
import { MutationTree } from "vuex";

export default {
  changePostName(state, { id, name }) {
    const index = state.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      state.posts[index].name = name;
    }
  },
  deletePost(state, postId: string) {
    const index = state.posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      state.posts.splice(index, 1);
    }
  },
  setPosts(state, payload) {
    state.posts = payload;
  },
  addPost(state, name) {
    state.posts.splice(0, 0, {
      id: Date.now().toString(),
      name,
    });
  },
} as MutationTree<StateType>;
