<!DOCTYPE html>
<html>

<head>
	<title>Staying Outside The Box</title>
	<script type="text/javascript" src="JavaScript.js"></script>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="stylesheet.css">
	<link rel="icon" type="image/ico" href="Resources/favicon.ico" />
</head>

<body>
<button onmouseover="expandPodBox()" onmouseout="shrinkPodBox()">PodBox</button>
<button onmouseover="expandLounge()" onmouseout="shrinkLounge()">S&S Lounge</button>
<button onmouseover="expandAbout()" onmouseout="shrinkAbout()">About</button>
<button onmouseover="expandStoryBox()" onmouseout="shrinkStoryBox()">StoryBox</button>
</body>

</html>
