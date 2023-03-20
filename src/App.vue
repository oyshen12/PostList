<template>
  <v-app>
    <v-main class="main">
      <PostList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import PostList from "./components/PostList/PostList.vue";
import posts from "./posts.json";

export default Vue.extend({
  name: "App",
  components: {
    PostList,
  },
  methods: {
    ...mapMutations(["setPosts"]),
  },
  mounted() {
    this.setPosts(posts.posts);
  },
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style>
.v-main__wrap {
  height: 100%;
}
</style>
