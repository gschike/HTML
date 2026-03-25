
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/redirect")
public class RedirectServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("/redirect doGet 실행");

		// 요청의 한글 깨짐 방지
		request.setCharacterEncoding("utf-8");
		// 응답의 한글 깨짐 방지
		response.setContentType("text/html; charset=utf-8;");

		
		String text = request.getParameter("text");
		System.out.println("text: " + text);
		
		request.setAttribute("item", "롱소드");
		response.getWriter().println("/forward의 응답 [GET]");
		
		response.sendRedirect("/proj02_request/another?text="+ text);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("/redirect doPost 실행");
		
		String text = request.getParameter("text");
		System.out.println("text: " + text);
		
		request.setAttribute("item", "롱소드");
		response.getWriter().println("/forward의 응답 [POST]");
		
		response.sendRedirect("/proj02_request/another?text="+ text);
		
	}

}
