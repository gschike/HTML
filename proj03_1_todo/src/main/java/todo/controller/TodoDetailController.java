package todo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.DTO.TodoDTO;
import todo.service.TodoService;

@WebServlet("/todo/detail")
public class TodoDetailController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("/todo/detail doGet 실행");

		try {
			
			String todo_id = request.getParameter("todo_id");
			System.out.println("todo_id: "+ todo_id);
			
			// 한글 깨짐 방지 
			request.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8;");
			
			// null 들어가면 NumberformatException 오류 뜸 / nullpointer 아님 
			int nTodo_id = Integer.parseInt(todo_id);
			
			// nTodo_id를 service로 보내고  DAO 까지 보낼꺼임 
			// "todo_id" 받아서 출력하기
			
			TodoService todoService = new TodoService();
			TodoDTO todoDTO = todoService.getTodo(nTodo_id);
			
			
			System.out.println(todoDTO);
			
			PrintWriter out = response.getWriter();
			out.println("<table border=1>");
			out.println("<tr>");
			out.println("    <th>todo_id</th>");
			out.println("    <th>duedate</th>");
			out.println("    <th>done</th>");
			out.println("    <th>content</th>");
			out.println("    <th>ctime</th>");
			out.println("</tr>");
			
			out.println("<tr>");
			out.println("    <td>" + todoDTO.getTodo_id() +"</td>");
			out.println("    <td>" + todoDTO.getDuedate()+"</td>");
			out.println("    <td>" + todoDTO.getDone()+"</td>");
			out.println("    <td>" + todoDTO.getContent()+"</td>");
			out.println("    <td>" + todoDTO.getCtime()+"</td>");
			out.println("</tr>");
		
			out.println("</table>");
			out.println("<a href='../todo'>목록으로</a>");
			out.println("<hr>");
			
			
			out.println("<a href = '/proj03_1_todo/todo/modify?todo_id=" + todoDTO.getTodo_id() +"'>수정페이지로 이동</a><br>");
			out.println("<a href = '/proj03_1_todo/todo/delete?todo_id=" + todoDTO.getTodo_id() +"'>삭제페이지로 이동</a><br>");
			
			// 상세내용 콘솔에 찍히게 
			// 수정페이지에서 input으로 
		
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
