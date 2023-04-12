<!DOCTYPE html>
<html>
<head>
<title>Tokens</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/ico" href="/Resources/favicon.ico" />
<link rel="stylesheet" href="stylesheet.css">
</head>

<body onLoad="updateTokens()">
<div class="container">
<div id="jaxBox">
<strong>
Jax
</strong>
<br>
<label id="jax">
Error
<!--java inserts tokens-->
</label>
<button onclick="jaxDown()">
-
</button>
<button onclick="jaxUp()">
+
</button>
</div>
<br>
<div id="kaiBox">
<strong>
Kai
</strong>
<br>
<label id="kai">
Error
<!--java inserts tokens-->
</label>
<button onclick="kaiDown()">
-
</button>
<button onclick="kaiUp()">
+
</button>
</div>
</div>
<br>
<div
class="container">
<strong>
Shop
</strong>
<br>
<!--------Prices--------->
Clothes:10
Treat:5
Toy:10
<!------------------------>
</div>
<script src="JavaScript.js"></script>
</body>
</html>
