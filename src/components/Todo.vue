<template>

  <v-text-field
  v-model="newItem"
  class="add-item"
  outlined
  label="Add Todo Item"
  append-inner-icon="mdi-plus"
  hide-details
  clearable
  @click:append-inner="addItem()"
  @keyup.enter="addItem()"
></v-text-field>

  <v-list
    :lines="false"
    density="compact"
    nav
  >
    <v-list-item
      v-for="(todoItem, i) in this.$store.state.todoItems"
      :key="i"
      :value="todoItem"
      color="green"
      :active="todoItem.status.done"
    >
      <template v-slot:prepend >
        <v-icon :icon="todoItem.icon" @click="doneTask(todoItem.id)"></v-icon>
      </template>

      <v-list-item-title class="text-capitalize" :class="{'text-decoration-line-through' : todoItem.status.done}" v-text="todoItem.name"></v-list-item-title>

      <v-list-item-action>
        <v-btn
        color="grey-lighten-1"
        icon="mdi-delete"
        variant="text"
        @click="deleteItem(todoItem.id)"
      ></v-btn>
      </v-list-item-action>

    </v-list-item>
  </v-list>
</template>

<script>

  export default {
    data: () => ({
      drawer: null,
      newItem: '',
      todoItems: '',
      items: [
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
      doneTask(id) {
        this.$store.dispatch('doneTask',{id: id});
      },
      deleteItem(id) {
        this.$store.dispatch('deleteItem',{id: id});
      },
      addItem() {
          if(this.newItem != '') {
            this.$store.dispatch('addItem',
            {
              id: Date.now(),
              name: this.newItem,
              icon: 'mdi-check-circle',
              status: {
                done: false
              }
            });
            this.newItem = '';
          }
      }
     }
  }
</script>

<style>
.v-list-item__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mdi-delete:hover::before {
  color:red;
}
</style>
