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
		},

		clearCompleted: function() {
		    var completed = this.filterBy('isCompleted', true);
		    completed.invoke('deleteRecord');
		    completed.invoke('save');
		}
	},

	allAreDone: function(key, value) {
		if(value === undefined) {
			return !!this.get('length') && this.isEvery('isCompleted');
		} else {
			this.setEach('isCompleted', value);
			this.invoke('save');
			return value;
		}
	}.property('@each.isCompleted'),
	

	hasCompleted: function() {
		return this.get('completed') > 0;
	}.property('completed'),

	completed: function() {
		return this.filterBy('isCompleted', true).get('length');
	}.property('@each.isCompleted'),

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
			console.log("state: ", this.get('currentState.stateName'));
		},

		acceptChanges: function() {
			this.set('isEditing', false);
			console.log("accept changes");
			console.log("state: ", this.get('currentState.stateName'));

			if (Ember.isEmpty(this.get('model.title'))) {
				console.log("Empty state: ", this.get('currentState.stateName'));
				this.send('removeTodo');
			} else {
				this.get('model').save();
			}

		},

		removeTodo: function() {
			console.log("removeTodo state: ", this.get('currentState.stateName'));
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