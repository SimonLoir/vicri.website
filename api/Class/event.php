<?php
class event
{
    function __construct($db, $event)
    {
        if (!isset($event["title"]) || empty(trim($event["title"]))) {
            exit('error : missing title');
        }
        if (!isset($event["message"]) || empty(trim($event["message"]))) {
            exit('error : missing message');
        }
        if (!isset($event["add_to"]) || empty(trim($event["add_to"]))) {
            exit('error : missing add_to');
        }

        if (!isset($event["date"]) || empty(trim($event["date"]))) {
            exit('error : missing date');
        }

        extract($event);

        $date = $date . ":00";

        $user_date = new DateTime($date);
        $now = new DateTime();

        if ($add_to != "-1") {
            $project = new project($db, $add_to, true);
        }

        if ($user_date < $now) {
            exit("Merci de ne pas définir de date dans le passé.");
        }

        if ($db->query('INSERT INTO events VALUES(NULL, :title, :descri , :d, :add_to)', [
            "result" => true,
            "prepare" => [
                ":title" => $title,
                ":descri" => $message,
                ":d" => $date,
                ":add_to" => $add_to
            ]
        ])) {
            $email = new email([
                "global_title" => "Calendrier Vicri",
                "title" => $title,
                "message" => $message
            ]);

            if ($add_to == "-1") {
                $email->send($GLOBALS["vicri_email"]);
            }


            exit('ok');
        } else {
            exit('Server error');
        }


        exit('`');

    }
}
?>