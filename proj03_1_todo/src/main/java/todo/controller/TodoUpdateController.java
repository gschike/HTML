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


@WebServlet("/todo/update")
public class TodoUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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

}
