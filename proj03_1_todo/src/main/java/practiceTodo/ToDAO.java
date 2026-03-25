package practiceTodo;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ToDAO {

	public List<ToDTO> selectAll() {
		List<ToDTO> list = new ArrayList<ToDTO>();

		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {

			Context ctx = new InitialContext();
			DataSource dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/oracle");

			// DB 연결
			conn = dataFactory.getConnection();

			// SQL 준비
			String query = "select * from todo";
			ps = conn.prepareStatement(query);

			// SQL 실행
			rs = ps.executeQuery();

			while (rs.next()) {
				int todo_id = rs.getInt("todo_id");
				Date duedate = rs.getDate("duedate");
				int done = rs.getInt("done");
				String content = rs.getString("content");
				Date ctime = rs.getDate("ctime");

				ToDTO toDTO = new ToDTO();
				toDTO.setTodo_id(todo_id);
				toDTO.setDuedate(duedate);
				toDTO.setDone(done);
				toDTO.setContent(content);
				toDTO.setCtime(ctime);

				list.add(toDTO);

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
		return list;
	} 
}
