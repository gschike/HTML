

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/calc")
public class CalcServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String a = request.getParameter("first");
		int aa = Integer.parseInt(a);
		String b = request.getParameter("second");
		int bb = Integer.parseInt(b);
		
		System.out.println(aa + " + "+  bb + " = " + (aa+bb));
		
		response.getWriter().println(aa + " + "+  bb + " = " + (aa+bb));
		
//		String c = request.getRequestURL("");
		   
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
