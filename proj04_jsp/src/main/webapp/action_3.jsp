<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%-- 	<jsp:include page="jsp_1.jsp?name=abcd"></jsp:include> --%>
<%-- 		<jsp:param name="name" value="abcd"></jsp:param> --%>
	<jsp:include page="jsp_1.jsp">
		<jsp:param name="name" value="abcd" />
	</jsp:include>
	
	<!--  include 안에 주석 있으니까 에러나더라 -->
	
	<jsp:forward page="footer.jsp" />
	
	
</body>
</html>