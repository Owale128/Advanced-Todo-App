export class Todo {
  id: number;
  text: string;
  done: boolean;

  constructor(id: number, text: string, done: boolean = false) {
    this.id = id;
    this.text = text;
    this.done = done;
  }
}