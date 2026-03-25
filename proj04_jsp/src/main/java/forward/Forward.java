package forward;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Forward
 */
@WebServlet("/Forward")
public class Forward extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Forward 의 doGet실행");
		
		int num = 10; 
		
		Map map = new HashMap();
		map.put("점심", "라면");
		map.put("개수", "3개");
		System.out.println("map : " + map);
		
		request.setAttribute("num", num);
		request.setAttribute("map", map);
		
		List list = new ArrayList();
		list.add(7);
		list.add("글씨");
		list.add(map);
		
		String[] arr = new String[3];
		arr[0] = "x";
		arr[1] = "y";
		arr[2] = "z";
		
		TodoDTO todoDTO = new TodoDTO(); 
		todoDTO.setContent("할 일");
		
		request.setAttribute("list",list);
		request.setAttribute("arr",arr);
		request.setAttribute("todoDTO",todoDTO);
		
		//request.getRequestDispatcher("request_2.jsp").forward(request,response);
		request.getRequestDispatcher("el_4.jsp").forward(request,response);
		
	}

	
}
