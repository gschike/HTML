package practiceTodo;

import java.util.List;

public class ToService {

	public List<ToDTO> getList(){
		ToDAO toDAO = new ToDAO(); 
		return toDAO.selectAll();
	}
}
