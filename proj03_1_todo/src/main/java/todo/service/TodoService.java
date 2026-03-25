package todo.service;

import java.util.List;

import todo.DAO.TodoDAO;
import todo.DTO.TodoDTO;

public class TodoService {

	
	public List getList() {
		// TodoDAO의 selectAll을 호출하고 
		// 그 List를 return 해주세요 
		
		TodoDAO todoDAO = new TodoDAO();
		return todoDAO.selectAll();
	}
	
	
	public TodoDTO getTodo(int todo_id) {
		TodoDAO todoDAO = new TodoDAO();
		TodoDTO todoDTO = todoDAO.selectOne(todo_id);
		return todoDTO;
	}
	
	
	public int addTodo(TodoDTO todoDTO) {
		TodoDAO todoDAO = new TodoDAO();
		return todoDAO.insertTodo(todoDTO);	
	} 
	
	public int update(TodoDTO dto) {
		TodoDAO todoDAO = new TodoDAO();
		int count = todoDAO.updateTodo(dto);
		return count;
	}
	
	public int delete(TodoDTO dto) {
		TodoDAO todoDAO = new TodoDAO();
		return todoDAO.deleteTodo(dto);
	}
		
	
}
