<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%@ page import="java.util.*" %>
  <%@ page import="forward.TodoDTO" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<% int num = (int)request.getAttribute("num");
	Map map = (Map)request.getAttribute("map");
	List list = (List)request.getAttribute("list");
	Map map2 = (Map)list.get(2);
	// map2.get("점심");
	String[] arr = (String[])request.getAttribute("arr");
	TodoDTO todoDTO = (TodoDTO)request.getAttribute("todoDTO");
	
	System.out.println("jsp > num : " + num);
	System.out.println("jsp > map : " + map);
	out.println("map: " + map);
	%><br>
	<%= request.getAttribute("num") %><br>
	<%= map %><br>
	<%= list %> <br>
	<% 
	for(int i = 0; i<arr.length ; i++){
	System.out.print(arr[i]);
	out.println(arr[i]);
	}
	%><br>
	
	<%= todoDTO.getContent() %><br>


</body>
</html>