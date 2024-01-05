import { createStore } from 'vuex'

export default createStore({
  state: {
    newItem: '',
    todoItems: '',
    todoDone: ''
  },
  actions: {
    addItem(context, value) {
      //push data to todo
      context.state.todoItems.push(value);
      //save localstorage
      localStorage.setItem('Todo-items', JSON.stringify(context.state.todoItems));
      //update total not done
      context.state.todoDone = context.state.todoItems.filter(todoItem => todoItem.status.done == true).length;
    },
    doneTask(context, data) {
      //filter by id
      let todoItems = context.state.todoItems.filter(todoItem => todoItem.id === data.id )[0];
      //update status
      todoItems.status.done = !todoItems.status.done;
      //set total done
      context.state.todoDone = context.state.todoItems.filter(todoItem => todoItem.status.done == true ).length;
      //update localStorage
      localStorage.setItem('Todo-items', JSON.stringify(context.state.todoItems));
      //update state
      context.state.todoItems = context.state.todoItems;
    },
    deleteItem(context, data) {
      //filter by id and remove selected
      context.state.todoItems = context.state.todoItems.filter(todoItem => todoItem.id != data.id );
      //update localstorage
      localStorage.setItem('Todo-items', JSON.stringify(context.state.todoItems));
      //update total not done
      context.state.todoDone = context.state.todoItems.filter(todoItem => todoItem.status.done == true).length;
    },
    deleteTaskDone(context) {
      //filter not done
      let done = context.state.todoItems.filter(todoItem => todoItem.status.done != true);
      context.state.todoItems = done;
      //update total not done
      context.state.todoDone = context.state.todoItems.filter(todoItem => todoItem.status.done == true).length;
    }
  },
  modules: {

  }
});
