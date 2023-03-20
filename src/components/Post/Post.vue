<template>
  <v-list-item class="post">
    <v-card class="post__card" :class="{ active: active }" dark>
      <v-card-title>
        <v-icon large left> mdi-twitter </v-icon>
        <span class="text-h6 font-weight-light">Новый пост</span>
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="modalRenamePost.opened = true">
              <v-list-item-title>Переименовать Пост</v-list-item-title>
            </v-list-item>
            <v-list-item @click="modalDeletePost = true">
              <v-list-item-title class="red--text"
                >Удалить Пост</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
        "{{ post.name }}"
      </v-card-text>
    </v-card>

    <v-dialog v-model="modalRenamePost.opened" max-width="600">
      <v-card class="d-flex flex-column">
        <v-card-title>Переименовать пост</v-card-title>
        <v-textarea
          v-model="modalRenamePost.newName"
          label="Имя"
          auto-grow
          outlined
          class="mx-8"
        ></v-textarea>
        <v-btn
          @click="changePostNameHandler(post.id)"
          color="primary"
          class="ml-auto mr-8 mb-8"
          >Сохранить</v-btn
        >
      </v-card>
    </v-dialog>
    <v-dialog v-model="modalDeletePost" max-width="450">
      <v-card class="d-flex flex-column pb-4">
        <v-card-title>Вы уверены что хотите удалить пост?</v-card-title>
        <v-btn @click="deletePost(post.id)" color="error" class="mx-6 mt-4"
          >Удалить</v-btn
        >
        <v-btn
          @click="modalDeletePost = false"
          color="primary"
          class="mx-6 mt-4"
          >Отмена</v-btn
        >
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { post } from "@/store/storeTypes";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "PostList",
  props: {
    post: {
      required: true,
      type: Object as () => post,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    modalRenamePost: {
      opened: false,
      newName: "",
    },
    modalDeletePost: false,
  }),
  methods: {
    ...mapMutations(["changePostName", "deletePost"]),
    changePostNameHandler(id: string) {
      this.changePostName({
        id,
        name: this.modalRenamePost.newName,
      });
      this.modalRenamePost = {
        opened: false,
        newName: "",
      };
    },
  },
});
</script>

<style scoped lang="scss" src="./Post.scss"></style>
