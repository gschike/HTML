<!-- html 주석 -->
<%-- jsp 주석 --%>

<%-- 
	디렉티브 태그
	"<%@"로 시작하는 태그
	1. page : 페이지 설정 및 import
	2. include : 다른 jsp 가져오기
	3. taglib : custom tag library를 사용할 수 있게 해줌 
 --%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    
    import="java.util.List"
    import="java.util.Map"
    %>
   <%@ page import ="java.util.List" %>
   <%@ page import ="java.util.*" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script>
	window.onload = function(){
		
		console.log("jsp_1.jsp")
	}
</script>
</head>
<body>
	<h1>hello world</h1>
	<!--  스크립틀릿 Scriptlet -->
	<%
		// 여기는 java 땅입니다
		System.out.println("java BABY~~");
	%>
	
	<table border=1>
	<% for(int i = 0; i<5;i++){%>
	<tr>
	<td>제목</td>
	<td>내용</td>
	</tr>
	<% } %>
	
	<%
	for(int i = 0; i<5;i++){
	      out.write("\r\n");
	      out.write("	<tr>\r\n");
	      out.write("	<td>제목2</td>\r\n");
	      out.write("	<td>내용2</td>\r\n");
	      out.write("	</tr>\r\n");
	      out.write("	");
	 } 
	%>
	</table>
	<%
		String name = request.getParameter("name");
		System.out.println("name: "+name);
		int a = 10; 
	%>
	
	<!--  표현식 -->
	<%= a %>
	<%= request.getParameter("name") %>
	
	<!--  선언문 -->
	<%! 
		String title = "보스";
		String getTitle(){
			return this.title;
		}
	%>
	<br>
	<%= getTitle() %><br>
	
	<!--  구구단 2단 출력 -->
	
	<%  for(int i =1; i<10 ; i++){
		out.println("2 * " +  i +  " = " + (2*i)+"<br>");
		 }
	%>
	
	<%  
		for(int i =1; i<10 ; i++){
			for(int j = 1; j< 10 ; j++){ %> 
				
				<!-- out.println("2 * " +  i +  " = " + (2*i)+"<br>"); -->
	<%= i %> x <%= j %> = <%= i*j %>
	<% 		}
		 }
	%>
	
	<% for(int i =1; i<10 ; i++){ %>
	2 x <%= i %> = <%= (2*i) %> <br>
	<%} %>
	
	<%@ include file="footer.jsp" %>
		
		

</body>
</html>