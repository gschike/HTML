package todo.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.DTO.TodoDTO;
import todo.service.TodoService;

@WebServlet("/todo/modify")
public class TodoModifyController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("todo/modify doGet 실행");

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

			int result = todoService.update(todoDTO);

			PrintWriter out = response.getWriter();

			out.write("<form method='post' action='update'> ");
			out.write("todo_id: " +  todoDTO.getTodo_id() + "<br>");
			out.write("todo_id: " + "<input type='hidden' name='todo_id' value='" + todoDTO.getTodo_id() + "'>");
			out.write("duedate: " + "<input type='date' name='duedate' value='" + todoDTO.getDuedate() + "'><br>");
			out.write("done: " + "<input type='number' name='done' value='" + todoDTO.getDone() + "'><br>");
			out.write("content: " + "<input type='text' name='content' value='" + todoDTO.getContent() + "'><br>");
			out.write("ctime: " + "<input type='date' name='ctime' value='" + todoDTO.getCtime() + "'><br>");
			out.write("<input type='submit' value='수정'>");
			out.write("</form>");
			
//			System.out.println(todoDTO.getDuedate());
			
//		System.out.println("todo_id:" + todoDTO.getTodo_id());
//		System.out.println("duedate:" + todoDTO.getDuedate());
//		System.out.println("done:" + todoDTO.getDone());
//		System.out.println("content:" + todoDTO.getContent());
//		System.out.println("ctime:" + todoDTO.getCtime());

		} catch (Exception e) {

		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("/todo/modify doPost 실행");
		// 한글처리
//		request.setCharacterEncoding("utf-8");
//		response.setContentType("text/html; charset=utf-8;");
//		// 파라메터 확보
//		String content = request.getParameter("content");
//		System.out.println("content: " + content);
//		// DTO에 넣기
//		//TodoDTO todoDTO = new TodoDTO();
//		TodoService todoService = new TodoService();
//		TodoDTO todoDTO = new TodoDTO();
//		int result = todoService.update(todoDTO);
//		
		//todoDTO.setContent(content);
		// service로 DTO를 보냄

//		
//
//		System.out.println("result된rows:" + result);
//
//		// request.getRequestDispatcher("../todo").forward(request, response);
//
//		response.sendRedirect("/proj03_1_todo/todo");

	}
}
