<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
\${ 10 } : [${ 10 }]<br>
\${ null } : [${ null }] : null 이면 아무것도 안나옴, 예외없음 , 예외 발생하지 않음 <br>
\${ 10+5 } : ${ 10+5 } : 간단한 연산 가능 <br>
\${ "10"+5 } : ${ "10"+5 } : EL은 계산할 때 문자를 숫자로 바꾼다 <br>
<%-- \${ "a"+5 } : ${ "a"+5 }   <br> --%>
<%-- \${ "a"+"b" } : ${ "a"+"b" }   <br> --%>
\${ "a" } : ${ "a" }   <br>
\${ "a"+= 1 } : ${ "a"+= 1 }   <br>
<% 
	String a = "a";
	a = a + 1;
%>
\${ 10 % 4 } : ${ 10 % 4 }<br>
\${ 10 mod 4 } : ${ 10 mod 4 }<br>

\${ 10 / 4 } : ${ 10 / 4 }<br>
\${ 10 div 4 } : ${ 10 div 4 }<br>

\${ 10 == 4 } : ${ 10 == 4 }<br>
\${ 10 eq 4 } : ${ 10 eq 4 }<br>
\${ "a" eq "a" } : ${ "a" eq "a" }<br>

\${ 10 != 4 } : ${ 10 != 4 }<br>
\${ 10 ne 4 } : ${ 10 ne 4 }<br>

\${ !("a" eq "a") } : ${ !("a" eq "a") }<br>
\${ not("a" eq "a") } : ${ not("a" eq "a") }<br>

\${ 10 > 4 } : ${ 10 > 4 } : greater than<br>
\${ 10 gt 4 } : ${ 10 gt 4 } : greater than<br>

\${ 10 < 4 } : ${ 10 < 4 } : less than 또는 little than<br>
\${ 10 lt 4 } : ${ 10 lt 4 } : less than 또는 little than<br>

\${ 10 >= 4 } : ${ 10 >= 4 } : greater or equal<br>
\${ 10 ge 4 } : ${ 10 ge 4 } : greater or equal<br>

\${ 10 <= 4 } : ${ 10 <= 4 } : less or equal<br>
\${ 10 le 4 } : ${ 10 le 4 } : less or equal<br>

\${ (10 <= 4) eq "false" } : ${ (10 <= 4) eq "false" }  <br>

\${ (100>3) && (7 != 3) } : ${ (100>3) && (7 != 3) }<br>
\${ (100>3) and (7 != 3) } : ${ (100>3) and (7 != 3) }<br>

\${ (100>3) || (7 != 3) } : ${ (100>3) || (7 != 3) }<br>
\${ (100>3) or (7 != 3) } : ${ (100>3) or (7 != 3) }<br>
<hr>
\${ empty "글씨" } : ${ empty "글씨" }<br>
\${ empty null } : ${ empty null }<br>
\${ empty "" } : ${ empty "" }<br>
내용이 <strong>없으면</strong> true<br>
<hr>
request.getParameter("a") : <%= request.getParameter("a") %><br>
\${ param.a } : ${ param.a }<br>
\${ param.b } : ${ param.b }<br>

\${ paramValues.a[0] } : ${ paramValues.a[0] }<br>
\${ paramValues.a[1] } : ${ paramValues.a[1] }<br>
\${ paramValues.a[100] } : ${ paramValues.a[100] } : 예외 발생하지 않음 <br>
<hr>
 request.getAttribute("num") :<%= request.getAttribute("num") %><br>
\${ num } :${ num } <br>
\${ num2 } :[${ num2 }] <br>

\${ list } :[${ list }] <br>
\${ list[1] } :[${ list[1] }] <br>

\${ arr } :${ arr } <br>
\${ arr[1] } :${ arr[1] } <br>

\${ map } :${ map } <br>
\${ map["점심"] } :${ map["점심"]  } <br>
\${ map.점심 } :${ map.점심  } <br>

\${ todoDTO } :${ todoDTO  } <br>
\${ todoDTO.content } :${ todoDTO.content  } <br>

<script>
	const count= 3;
	let sum = 50;
	console.log(`count: \${count}, sum : \${sum}`)
</script>

</body>
</html>