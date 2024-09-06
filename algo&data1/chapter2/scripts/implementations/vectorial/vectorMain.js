export class vector {
  constructor(length) {
    this.vectorlength = length;
    this.vector = Array(this.vectorlength).fill(0);
  }
  size = 0;

  get first() {
    if (0 === this.size) {
      console.log("error, empty plist");
    } else {
      return 0;
    }
  }

  get last() {
    if (0 === this.size) {
      console.log("errer, empty plist so no last element");
    } else {
      return this.size - 1;
    }
  }

  has_next(position) {
    console.log(position + 1 < this.size);
  }

  has_previous(position) {
    console.log(0 < position);
  }

  next(position) {
    if (!this.has_next(position)) {
      console.log("error, no next");
    } else {
      return pos + 1;
    }
  }

  previous(position) {
    if (!this.has_previous(position)) {
      console.log("error, no previous");
    } else {
      return pos - 1;
    }
  }

  get length() {
    return this.size;
  }

  get empty() {
    return 0 === this.size;
  }

  full() {
    return this.size == this.vectorlength;
  }

  storage_move_right(i, j) {
    for (let idx = j; idx >= i; idx--) {
      this.vector[idx + 1] = this.vector[idx];
    }
  }
  storage_move_left(i, j) {
    for (let idx = i; idx <= j; idx++) {
      this.vector[idx - 1] = this.vector[idx];
    }
  }

  peek(position) {
    if (position > this.size) {
      console.log("error, illegal position");
    } else {
      return this.vector[position];
    }
  }
  update(position, value) {
    if (position > this.size) {
      console.log("error, illegal position");
    } else {
      this.vector[position] = value;
    }
  }
  detach_middle(position) {
    let free = this.size;
    this.storage_move_left(position + 1, free - 1);
    this.size = free - 1;
  }

  detach_first() {
    this.detach_middle(0);
  }

  detach_last() {
    let free = this.size;
    this.size = free - 1;
  }

  attach_middle(value, position) {
    let free = this.size;
    this.storage_move_right(position + 1, free - 1);
    this.vector[position + 1] = value;
    this.size = free + 1;
  }
  attach_first(value) {
    this.attach_middle(value, -1);
  }
  attach_last(value) {
    let free = this.size;
    this.vector[free] = value;
    this.size = free + 1;
  }
}
