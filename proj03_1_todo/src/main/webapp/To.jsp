
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

 	<table border=1>
 	<tr>
 	<th>todo_id</th>
 	<th>duedate</th>
 	<th>done</th>
 	<th>content</th>
 	<th>ctime</th>
 	</tr>
 	<c:forEach var="todo" items="${list}">
 	<tr> 
 	<td>${todo.todo_id }</td> 
 	<td>${todo.duedate}</td> 
 	<td>${todo.done}</td> 
 	<td>${todo.content}</td> 
 	<td>${todo.ctime}</td> 
 	</tr>
 	 </c:forEach>
 	</table>
 	
 
 	
</body>
</html>