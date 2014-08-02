Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function() {
			var title = this.get('newTitle');
			if(!title) { return false; }
			if(!title.trim()) { return ;}

			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});

			this.set('newTitle', '');

			todo.save();
		}
	},

	remaining: function() {
  		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),

	inflection: function() {
		var remaining = this.get('remaining');
		return remaining === 1 ? 'todo' : 'todos';
	}.property('remaining')
});

Todos.TodoController = Ember.ObjectController.extend({
	actions: {
		editTodo: function() {
			this.set('isEditing', true);
		},

		acceptChanges: function() {
			this.set('isEditing', false);
			console.log("accept changes");

			if (Ember.isEmpty(this.get('model.title'))) {
				this.send('removeTodo');
			} else {
				this.get('model').save();
			}

		},

		removeTodo: function() {
			var record = this.get('model');
			record.deleteRecord();
			record.save();
		}
	},

	

	isEditing: false,

	isCompleted: function(key, value){
    	var model = this.get('model');

    	if (value === undefined) {
      	// property being used as a getter
      	return model.get('isCompleted');
    	} else {
      	// property being used as  setter
      		model.set('isCompleted', value);
      		model.save();
      		return value;
    	}
  	}.property('model.isCompleted')
});