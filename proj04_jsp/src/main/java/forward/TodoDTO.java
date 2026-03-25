package forward;

import java.sql.Date;

// DTO : Data Transfer Object
// VO : Value Object
public class TodoDTO {
	
	
	private int todo_id;
	private Date duedate;
	private int done;
	private String content;
	private Date ctime;
	
	public int getTodo_id() {
		return this.todo_id;
	}
	
	public void setTodo_id(int todo_id) {
		this.todo_id = todo_id;
	}

	@Override
	public String toString() {
		return "TodoDTO [todo_id=" + todo_id + ", duedate=" + duedate + ", done=" + done + ", content=" + content
				+ ", ctime=" + ctime + "]";
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public int getDone() {
		return done;
	}

	public void setDone(int done) {
		this.done = done;
	}

	public String getContent() {
		System.out.println("getContent 실행");
		return content;
	}

	public void setContent(String content) {
		System.out.println("setContent 실행");
		this.content = content;
	}

	public Date getCtime() {
		return ctime;
	}

	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
}
