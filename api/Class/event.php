<?php
class event
{
    function constructor($event)
    {
        if (!isset($event["title"])) {
            exit('error: event must have a title');
        }
    }
}
?>