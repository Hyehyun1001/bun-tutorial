import { RdbmsConfig } from "@main/configure/rdbms.config";
import { TodoData } from "@main/todo/todo.data";
import { TodoDto } from "@main/todo/todo.model";

const findAll = () => {
  const query: string = "SELECT * FROM todo";
  return RdbmsConfig.allQuery(query);
};

const findById = (id: number) => {
  const query: string = `SELECT * FROM todo WHERE id = ${id}`;
  return RdbmsConfig.getQuery(query);
};

const add = (todo: TodoDto) => {
  const query: string = `INSERT INTO todo(title, status)
 VALUES('${todo.title}', '${todo.status}') RETURNING *`;
  return RdbmsConfig.getQuery(query);
};

const update = (id: number, todo: TodoDto) => {
  const query: string = `UPDATE todo SET title='${todo.title}', status='${todo.status}'
WHERE id = ${id} RETURNING *`;
  return RdbmsConfig.getQuery(query);
};

const remove = (id: number) => {
  const query: string = `DELETE FROM todo WHERE id = ${id} RETURNING *`;
  return RdbmsConfig.getQuery(query);
};

export const TodoHandlerRdbms = {
  findAll,
  findById,
  add,
  update,
  remove,
};
