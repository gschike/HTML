package todo.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.DTO.TodoDTO;
import todo.service.TodoService;

/**
 * Servlet implementation class TodoDeleteController
 */
@WebServlet("/todo/delete")
public class TodoDeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		System.out.println("todo/delete doGet 실행");

		try {

			String todo_id = request.getParameter("todo_id");
		

			System.out.println("todo_id: " + todo_id);
			

			// 한글 깨짐 방지
			request.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8;");

			// null 들어가면 NumberformatException 오류 뜸 / nullpointer 아님
			int nTodo_id = Integer.parseInt(todo_id);

			// nTodo_id를 service로 보내고 DAO 까지 보낼꺼임
			// "todo_id" 받아서 출력하기

			TodoService todoService = new TodoService();
			TodoDTO todoDTO = todoService.getTodo(nTodo_id);

			int result = todoService.delete(todoDTO); 
			
			response.sendRedirect("../todo");
		
		}catch (Exception e) {
			
		}
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/todo/delete doPost 실행");
		// 한글처리
//		request.setCharacterEncoding("utf-8");
//		response.setContentType("text/html; charset=utf-8;");
//		// 파라메터 확보
//		String todo_id = request.getParameter("todo_id");
//		System.out.println("todo_id: " + todo_id);
//		// DTO에 넣기
//		//TodoDTO todoDTO = new TodoDTO();
//		TodoService todoService = new TodoService();
//		TodoDTO todoDTO = new TodoDTO();
//		int result = todoService.delete(todoDTO);
//		
//		//todoDTO.setContent(content);
//		// service로 DTO를 보냄

		

//		System.out.println("result된rows:" + result);
//
//		// request.getRequestDispatcher("../todo").forward(request, response);
//
//		response.sendRedirect("/proj03_1_todo/todo");
	}

}
