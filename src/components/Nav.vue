<template>
  <v-navigation-drawer v-model="drawer">
    <v-list-item title="My Todo List" subtitle="todo-list"></v-list-item>
    <v-divider></v-divider>
    <v-list-item
    v-for="(item, i) in items"
    :key="i"
    :value="item"
    :to="item.to"
    color="primary"
  >
    <template v-slot:prepend>
      <v-icon :icon="item.icon"></v-icon>
    </template>

    <v-list-item-title v-text="item.text"></v-list-item-title>
  </v-list-item>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-app-bar-title>Todo List</v-app-bar-title>

    <v-chip
    class="ma-2"
    color="blue"
  >
  Task:&nbsp;<span>{{ this.$store.state.todoItems.length }}</span>
  </v-chip>

    <v-chip
    class="ma-2"
    color="blue"
  >
  Task Done:&nbsp;<span>{{ this.$store.state.todoDone }}</span>
  </v-chip>

  <div v-if="this.$store.state.todoDone">
    <v-btn
    class="mr-2"
    prepend-icon="mdi-delete"
    color="red"
    variant="tonal"
    @click="deleteTaskDone">
      Task Done
    </v-btn>
  </div>

  <v-btn
  prepend-icon="mdi-delete"
  color="red"
  variant="tonal"
  @click="deleteTask">
    Task
  </v-btn>

  </v-app-bar>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(null);
</script>
<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { text: 'Todo', to: "/", icon: 'mdi-home' },
        { text: 'About', to: "/about", icon: 'mdi-account' },
      ],
      todoItems: [
        {
          id: 1,
          name: 'Todo 1',
          icon: 'mdi-check-circle',
          status: {
            done: false
          }
         },
         {
          id: 2,
          name: 'Todo 2',
          icon: 'mdi-check-circle',
          status: {
            done: false
          }
         },
         {
          id: 3,
          name: 'Todo 3',
          icon: 'mdi-check-circle',
          status: {
            done: true
          }
         },
      ],
     }),
     methods: {
        deleteTask() {
          this.todoItems = [];
          this.$store.state.todoItems = [];
          localStorage.setItem('Todo-items', '');
        },
        deleteTaskDone() {
          this.$store.dispatch('deleteTaskDone');
        }
      },
      async mounted() {
        // insert to localstorage
        localStorage.setItem('Todo-items', JSON.stringify(this.todoItems));

        //set state todo items
        this.$store.state.todoItems = JSON.parse(localStorage.getItem('Todo-items'));

        //filter total done
        let done = this.$store.state.todoItems.filter(todoItem => todoItem.status.done == true);

        //set total done
        this.$store.state.todoDone = done.length;
      }
  }
</script>
