export type TodoA = {
    id: number;
    todo: string;
}

export interface TodoB {
     id: number;
     todo: string;
}

class TodoC {
    constructor(public id: number, public todo: string) {
    }

    doSomething(): void {
        console.log("doing");
    }
}

const todoA: TodoA = { id: 1, todo: "TODO" };
const todoB: TodoB = { id: 2, todo: "TODO" };
const todoC: TodoC = new TodoC(3, "TODO");
