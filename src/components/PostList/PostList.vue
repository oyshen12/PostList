<template>
  <div class="posts">
    <div class="posts__search">
      <v-text-field
        v-model="searchablePosts"
        hide-details
        label="Поиск"
      ></v-text-field>
      <v-btn
        @click="modalNewPost.opened = true"
        color="primary"
        class="ml-8 mt-auto"
        >Добавить пост</v-btn
      >
    </div>
    <v-list>
      <Lazy
        v-for="post in postsFiltered"
        :key="post.id"
        :min-height="150"
        :unrender="true"
      >
        <Post
          :post="post"
          @click.native="activePost = post.id"
          :active="activePost === post.id"
        />
      </Lazy>
    </v-list>
    <v-dialog v-model="modalNewPost.opened" max-width="600">
      <v-card class="d-flex flex-column">
        <v-card-title>Новый пост</v-card-title>
        <v-textarea
          v-model="modalNewPost.name"
          label="Имя"
          auto-grow
          outlined
          class="mx-8"
        ></v-textarea>
        <v-btn @click="addPostHandler" color="primary" class="ml-auto mr-8 mb-8"
          >Сохранить</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import Lazy from "../Lazy/Lazy.vue";
import Post from "../Post/Post.vue";

export default Vue.extend({
  name: "PostList",
  components: { Post, Lazy },
  data: () => ({
    selectedPost: 1,
    activePost: "",
    searchablePosts: "",
    modalNewPost: {
      opened: false,
      name: "",
    },
  }),
  computed: {
    ...mapState(["posts"]),
    postsFiltered() {
      return this.posts.filter((post) =>
        post.name.includes(this.searchablePosts)
      );
    },
  },
  methods: {
    ...mapMutations(["addPost"]),
    addPostHandler() {
      this.addPost(this.modalNewPost.name);
      this.modalNewPost = {
        opened: false,
        name: "",
      };
    },
  },
});
</script>

<style scoped lang="scss" src="./PostList.scss"></style>
