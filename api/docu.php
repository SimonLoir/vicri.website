<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Vicri API Documentation</title>
	<style>
		body{
			background: #EEE;
			color:rgba(0,0,0,0.75);
			font-family: sans-serif;
			font-size: 16px;
		}
		.section{
			padding: 15px;
		}
		.section>div{
			border-left: 5px solid rgba(0,0,0,0.75);
			display: block;
			padding: 15px;
			padding-left: 40px;
		}
	</style>
</head>
<body>
	<h1>Documentation of the API</h1>
	<h2>GET method</h2>
		<div class="section">
			<h3 id="projects">?res=projects</h3>
			<div>
				<span>Output format: JSON</span>
				<p>
					Get all projects
				</p>
				<span>Return => [{id (int), name (string), managers (array), progression (int), pined (int), 	shortDescription (string), user_is_manager (bool)}, {project}, {project}]</span>
			</div>
		</div>
		<div class="section">
			<h3 id="project">?res=project&id={project_id}</h3>
			<div>
				<span>Output format: JSON</span>
				<p>Get the project by its id.</p>
				<span>Return => {id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)} <br /><b>OR</b><br />{"UError"}
				
				</span>
			</div>
		</div>

</body>
</html>