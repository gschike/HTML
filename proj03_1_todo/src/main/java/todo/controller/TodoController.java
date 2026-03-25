package todo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.DTO.TodoDTO;
import todo.service.TodoService;


@WebServlet("/todo")
public class TodoController extends HttpServlet {

       
  
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/todo doGet 실행");
		
		// 한글 깨짐 방지 
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8;");
		
		// DB에서 모든 목록 가져오기 
		// list 라는 변수에 담기 
		
		
		TodoService todoService = new TodoService();
		List<TodoDTO> list = todoService.getList();
		
		// html로 출력하기 
		
		PrintWriter out = response.getWriter();
		out.println("<form method='get' action='todo/delete'>");
		out.println("<a href = 'add.html'>글쓰기</a>");
		out.println("<table border=1>");
		out.println("<tr>");
		out.println("    <th>선택</th>");
		out.println("    <th>todo_id</th>");
		//out.println("    <th>duedate</th>");
		//out.println("    <th>done</th>");
		out.println("    <th>content</th>");
		out.println("    <th>ctime</th>");
		out.println("</tr>");
		for(int i=0; i<list.size(); i++) {
			TodoDTO todoDTO2 = list.get(i);
			
			//Map map = (Map)list.get(i);
//			out.println("<tr>");
//			out.println("    <td>" + map.get("todo_id")+"</td>");
//		//	out.println("    <td>" + map.get("duedate")+"</td>");
//		//	out.println("    <td>" + map.get("done")+"</td>");
//			out.println("    <td>" + map.get("content")+"</td>");
//			out.println("    <td>" + map.get("ctime")+"</td>");
//			out.println("</tr>");
//		}
	
		out.println("<tr>");
		out.println("    <td><input type='checkbox' value='delete'></td>");
		out.println("    <td>" + todoDTO2.getTodo_id() +"</td>");
	//	out.println("    <td>" + todoDTO2.getDuedate()+"</td>");
	//	out.println("    <td>" + todoDTO2.getDone()+"</td>");
		out.println("    <td> <a href = 'todo/detail?todo_id=" + todoDTO2.getTodo_id()+ "'>" + todoDTO2.getContent()+"</a> </td>");
		out.println("    <td>" + todoDTO2.getCtime()+"</td>");
		out.println("</tr>");
	}
		out.println("</table>");
		
		
		out.println("<input type = 'submit' value ='삭제' >");
		out.println("</form >");
		
		//out.println("<a href = \"http://127.0.0.1:8080/proj03_1_todo/todo/detail?todo_id="+ todoDTO.getTodo_id()+ "\"");
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/todo post 실행");
		doGet(request, response);
		
	
	}

}
