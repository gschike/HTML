package practiceTodo;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/TodoCon")
public class TodoCon extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/TodoCon doGet 실행");
		// 한글깨짐 방지
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=utf-8;");
		// Service 연결 리스트 가져오기
		ToService toservice = new ToService(); 
		List<ToDTO> list =toservice.getList();
		
		request.setAttribute("list",list);
		
		RequestDispatcher rd = request.getRequestDispatcher("/To.jsp");
		rd.forward(request, response);
		
		System.out.println(list.size());
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("/TodoCon doPost 실행");
	}

}
