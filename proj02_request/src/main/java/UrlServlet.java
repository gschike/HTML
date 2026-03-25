

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/url")
public class UrlServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("/url doGet 실행");
		
		// ip 주소 가져오기
		// localhost 0:0:0:0:0:0:0:1 
		String ip = request.getRemoteAddr();
		System.out.println("ip: " + ip);
		
		// 접근 method 확인
		System.out.println("getMethod: " + request.getMethod());
		// query string 빼고 접근 주소 나옴 
		System.out.println("getRequestURL: " + request.getRequestURL());
		// query string만 
		System.out.println("getQueryString: " + request.getQueryString());
		// ip, port, 쿼리스트링 제외한 주소
		// 즉 절대 경로
		System.out.println("getRequestURI: " + request.getRequestURI());
		// 프로젝트를 구분하는 주소 
		System.out.println("getContextPath: "+ request.getContextPath());
		// contextPath 뒤의 주소
		System.out.println("getServletPath: " + request.getServletPath());
	}

}
