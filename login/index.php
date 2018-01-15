<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vicri Login</title>
</head>
<body>
    <div class="login">
        <div>
            <img src="vicri.png" alt="">
        </div>
        <?php
            if(isset($_POST["send"])){
                //user login
            }
        ?>
        <form action="" method="post">
            <p><input type="text" name="user" placeholder="Nom d'utilisateur"></p>
            <p><input type="password" name="password" placeholder="Mot de passe"></p>
            <a href="../google/index.php">Me connecter avec Google</a><button name="send">Me connecter</button>
        </form>
    </div>
    <script src="../dist/login.bundle.js"></script>
</body>
</html>