Todos.EditTodoView = Ember.TextField.extend({
	didInsertElement: function() {
		this.$().focus();
		console.log(this.$(), this.get('value'));
	}
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);