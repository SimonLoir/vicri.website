<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test</title>
    <style>
        body{
            font-family:sans-serif;
            background:black;
            color:white;
        }
    </style>
</head>
<body>
    <h1>Test d'API</h1>
    <span>URL de l'API : <span id="api_url">../api/index.php?</span></span>
    
    <span class="test" data-url="res=projects" data-expected="[] => id, name, managers, shortDescription, progression, pined" data-format="json"></span>
    
    <span class="test" data-url="res=project&id=1" data-expected="{} => id, name, managers, shortDescription, progression, pined, type, progression, description, goals, links, video, photo, other, isPublished, managers_id" data-format="json"></span>
    

    <span class="test" data-url="res=login" data-expected="{} => isConnected" data-format="json"></span>

    <h1>Error messages</h1>
    
    <span class="test" data-url="res=project&id=1&manager" data-expected="{} => type, message" data-format="json"></span>
    
    <span class="test" data-url="res=user-projects" data-expected="{} => type, message" data-format="json"></span>

    <script src="../dist/test.bundle.js"></script>
</body>
</html>