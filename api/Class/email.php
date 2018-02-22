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
    function constructor($email)
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

        return $this->html;
    }
    /**
     * Sends a mail
     */
    public function send()
    {

    }
}
?>