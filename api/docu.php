<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Vicri API Documentation</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body{
			background: #EEE;
			color:rgba(0,0,0,0.75);
			font-family: sans-serif;
			font-size: 16px;
		}
		.section{
			padding: 15px;
			padding-left:50px; 
		}
		.section>div, .get{
			border-left: 5px solid rgba(0,0,0,0.75);
			transition: 0.3s;
			display: block;
			padding: 15px;
			padding-left: 40px;
		}
		.get{
			padding-left: 10px;
			border-left: 5px solid rgba(42, 67, 173, 0.94);
		}
		.get_title{
			color : rgba(42, 67, 173, 0.94);
		}
		.post{
			padding-left: 10px;
			border-left: 5px solid rgba(48, 113, 43, 0.94);
		}
		.post_title{
			color : rgba(48, 113, 43, 0.94);
		}
	</style>
</head>
<body>
	<h1>API Documentation</h1>
	<h2 class="get_title">GET method</h2>
	<div class="get">
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
		<div class="section">
			<h3 id="videos">?res=videos</h3>
			<div>
				<span>Output format: JSON</span>
				<p>Get all videos</p>
				<span>Return => [{id (int) ,url (string) ,provider (string) ,title (string) ,description (string)} , {video}]
				</span>
			</div>
		</div>
		<div class="section">
			<h3 id="user_connection_state">?res=user_connection_state</h3>
			<div>
				<span>Output format: JSON <b>OR</b> String</span>
				<p>Get user connection state</p>
				<span>Return => {name ,firstname ,mail ,pseudo}
				<br /><b>OR</b><br />
				"Empty"
				</span>
			</div>
		</div>
		<div class="section">
			<h3 id="doc">?res=doc</h3>
			<div>
				<span>Output format: text/html</span>
				<p>Returns this page</p>
			</div>
		</div>
		<div class="section">
			<h3 id="logout">?res=logout</h3>
			<div>
				<span>Nothing</span>
				<p>Destroys session</p>
			</div>
		</div>
		<div class="section">
			<h3 id="calendar">?res=calendar</h3>
			<div>
				<span>Output format: JSON</span>
				<p>Gets the calendar</p>
				<span>Return => [{id (int), title (string), description (string), date (string), global (int as boolean), project_id (int)}]
				<br /><b>OR</b><br />
				[]
				</span>
			</div>
		</div>
		<div class="section">
			<h3 id="users">?res=users</h3>
			<div>
				<span>Output format: JSON</span>
				<p>Gets all the users that are registered into the database</p>
				<span>Return => [{id (int), name (string), firstname (string), mail (string), pseudo (string)}]
				<br /><b>OR</b><br />
				[]
				</span>
			</div>
		</div>
	</div>
	<h2 class="post_title">POST method</h2>
	<div class="post">
		
		<div class="section">
			<h3 id="project">?res=login</h3>
			<div>
				<span>Output format: JSON</span>
				<span><br />POST: password, email</span>
				<p>
					Connect the user. 
				</p>
				<span>
					Return => {"ok"}
					<br /><b>OR</b><br />
					{"Error : incorrect password"}
					<br /><b>OR</b><br />
					{"Error : can't find the user"}		
				</span>
			</div>
		</div>
		
	</div>
</body>
</html>