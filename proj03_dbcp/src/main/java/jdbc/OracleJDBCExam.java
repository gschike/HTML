package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OracleJDBCExam {

	public static void main(String[] args) {
		long before = System.currentTimeMillis();
		

		String driver = "oracle.jdbc.driver.OracleDriver";

		String url = "jdbc:oracle:thin:@125.181.132.133:51521:xe";
		String user = "scott1_0";
		String password = "tiger";

		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null; 
		try {
			// new OracleDriver();
			// Class.forName : String을 이용해서 class를 생성
			// Oracle 드라이버 로딩
			// 드라이버driver : 서로 다른 것들을 서로 사용할 수 있게 해주는 것
			Class.forName(driver);

			// Connection conn = DriverManager.getConnection(url, user, password);
			// DB 접속
			conn = DriverManager.getConnection(url, user, password);

			// SQL 준비
			String query = "select * from emp";
			ps = conn.prepareStatement(query);

			// SQL 실행 및 결과 확보
			rs = ps.executeQuery();

			// 결과 활용
			while(rs.next()) {
				//System.out.println("행님의 쾌차를 기원합니다");
				int empno = rs.getInt("empno");
				String ename = rs.getString("ename");
				System.out.print("empno: " + empno);
				System.out.println(", ename: " + ename);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		long after = System.currentTimeMillis();
		System.out.println("----걸린시간 -------------");
		System.out.println(after - before);
	}

}
