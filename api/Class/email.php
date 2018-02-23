<?php
class email
{

    private $global_title = "Vicri.esy.es";

    private $title = "Vicri";

    private $message = "Email test";

    private $html = "";

    /**
     * Creates an email
     */
    function __construct($email)
    {
        if (isset($email["title"])) {
            $this->title = $email["title"];
        }

        if (isset($email["global_title"])) {
            $this->global_title = $email["global_title"];
        }

        if (isset($email["message"])) {
            $this->message = nl2br($email["message"]);
        }
    }
    public function build()
    {
        $this->html = file_get_contents('../res/email.html');

        $this->html = str_replace("{mail_title}", $this->global_title, $this->html);

        $this->html = str_replace("{title}", $this->title, $this->html);

        $this->html = str_replace("{content}", $this->message, $this->html);

        $this->html = str_replace("{action}", "Aller au site", $this->html);

        $this->html = str_replace("{action.link}", "http://vicri.esy.es", $this->html);

        return $this->html;
    }
    /**
     * Sends a mail
     */
    public function send($email)
    {

        // Plusieurs destinataires
        $to = $email;

        // Sujet
        $subject = 'Calendrier vicri';

        // message
        $message = $this->build();

        // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

        // En-têtes additionnels
        $headers .= 'From: Groupe Vicri <no-reply@simonloir.be>' . "\r\n";

        // Envoi
        try {
            if (!mail($to, $subject, $message, $headers)) {
                exit('error');
            }

        } catch (Exception $e) {
            exit('could not send the email');
        }
    }
}
?>