<?php include "global.php"; (!isset($_SESSION["user"])) ? header("Location: login"): $user = $_SESSION["user"];?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vicri Dashboard</title>
</head>
<body>
    <div class="header">
        <span class="title"></span>
        <span class="user"><?= $user ?> <span class="acccount-manager">&#9207;</span> </span>
    </div>
    <div class="left_panel">
        <div class="title">
            Vicri Dashboard
        </div>
        <div class="content">
            <div>
                Calendrier
            </div>
            <div>
                Mes projets
            </div>
            <div>
                <a href="home" style="color:inherit;text-decoration:none;">Retour au site</a>
            </div>
        </div>
    </div>
    <div class="body">
        
    </div>
    <script src="dist/dashboard.bundle.js"></script>
</body>
</html>