package todo.controller;

import java.io.IOException;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.DTO.TodoDTO;
import todo.service.TodoService;

/**
 * Servlet implementation class TodoCommandController
 */
@WebServlet("/cmd")
public class TodoCommandController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("/cmd doPost 실행");

		// String todo_id = request.getParameter("todo_id");
		String cmd = request.getParameter("cmd");

		if (cmd.equals("insert")) {
			insert(request, response);
		} else if (cmd.equals("update")) {
			update(request, response);
		} else if (cmd.equals("delete")) {
			delete(request, response);
		}
	}

	protected void insert(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("/todo/add doPost 실행");
		// 한글처리
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8;");
		// 파라메터 확보
		String content = request.getParameter("content");
		System.out.println("content: " + content);
		// DTO에 넣기
		TodoDTO todoDTO = new TodoDTO();
		todoDTO.setContent(content);
		// service로 DTO를 보냄
		TodoService todoservice = new TodoService();
		int result = todoservice.addTodo(todoDTO);

		System.out.println("result된rows:" + result);

		// request.getRequestDispatcher("../todo").forward(request, response);

		response.sendRedirect("/proj03_1_todo/todo");
	}

	protected void update(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/todo/update doPost 실행");
		
		String todo_id = request.getParameter("todo_id");
		String duedate = request.getParameter("duedate");
		String done = request.getParameter("done");
		String content = request.getParameter("content");
		String ctime = request.getParameter("ctime");
		
		
		try {
			
			TodoDTO dto = new TodoDTO();
			int tID = Integer.parseInt(todo_id);
			dto.setTodo_id(tID);
			
			if (duedate != "") {
				Date dDate = Date.valueOf(duedate);
				dto.setDuedate(dDate);
			}
			
			int d = Integer.parseInt(done);
			dto.setDone(d);
			
			dto.setContent(content);
			
			Date c = Date.valueOf(ctime);
			dto.setCtime(c);
			
			TodoService todoService = new TodoService();
			int count = todoService.update(dto);
			System.out.println("업데이트 결과 : "+ count);
			
			//////==========
			response.sendRedirect("detail?todo_id=" + todo_id);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	protected void delete(HttpServletRequest request, HttpServletResponse response)
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

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
