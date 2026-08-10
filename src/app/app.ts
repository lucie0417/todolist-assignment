import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  todos = signal<Todo[]>(this.readFromStorage());
  title = signal("");
  // count = signal(0);
  count = 0;;;;;;

  addTodo() {
    const text = this.title().trim();
    if (!text) return;

    const newTodo: Todo = {
      id: crypto.randomUUID() || Date.now().toString(),
      title: text,
      completed: false,
    }

    this.todos.update(list => [newTodo, ...list]);
    this.title.set('');
    this.saveToStorage();
  }

  toggleTodo(id: string) {
    this.todos.update((list => list.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    this.saveToStorage();
  }

  remove(id: string) {
    this.todos.update((list => list.filter(todo => todo.id !== id)));
    this.saveToStorage();
  }

  // save to localStorage
  readFromStorage(): Todo[] {
    try {
      return JSON.parse(localStorage.getItem('todos') || '[]');
    } catch {
      return [];
    }
  }

  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }

  // IME composing
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      this.addTodo();
    }
  }

  increase() {
    // this.count.update(number => number + 1);
    this.count = this.count + 1
  }

  decrease() {
    // this.count.update(number => number - 1);
    this.count = this.count - 1
  }
}
