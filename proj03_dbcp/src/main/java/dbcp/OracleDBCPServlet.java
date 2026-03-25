package dbcp;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet("/dbcp")
public class OracleDBCPServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		long before = System.currentTimeMillis();

		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			// JNDI 방식
			// context.xml 에 있는 DB 정보로 커넥션 풀을 가져온다
			Context ctx = new InitialContext();
			// DataSource : 커넥션 풀 관리자
			DataSource dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/oracle");

			// DB 접속(그런데 이제 커넥션 풀로)
			conn = dataFactory.getConnection();

			// SQL 준비
			String query = "select * from emp";
			ps = conn.prepareStatement(query);

			// SQL 실행 및 결과 확보
			rs = ps.executeQuery();

			PrintWriter out = response.getWriter();
			
			// 결과 활용
			while (rs.next()) {
				// System.out.println("행님의 쾌차를 기원합니다");
				int empno = rs.getInt("empno");
				String ename = rs.getString("ename");
				// java.sql.Date 를 import 해야 한다 
				Date hiredate = rs.getDate("hiredate");
				System.out.print("empno: " + empno);
				System.out.println(", ename: " + ename);
				out.println("<div>");
				out.println("      <strong>empno</strong>:" + empno);
				out.println(",      <strong>ename</strong>:" + ename);
				out.println(",      <strong>hiredate</strong>:" + hiredate);
				out.println("</div>");
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
					
					e.printStackTrace();
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					
					e.printStackTrace();
				}
			}
		}
		
		
		long after = System.currentTimeMillis();
		System.out.println("----걸린시간 -------------");
		System.out.println(after - before);

	}
	
	
}
