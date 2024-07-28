"use strict";

$(document).ready( () => {

    $("#countdown").click( function() {
        
        let name = $("#event").val();
        let dateString = $("#date").val();    
        let event = new Event(name, dateString)
        //make sure event name and date are entered
        if (validation.isEmpty(event.name) || validation.isEmpty(event.dateString)) {
            $("#message").text("Please enter both a name and a date.");
            return;
        }  

        //make sure due date string has slashes and a 4-digit year
        if (validation.hasNoSlashes(event.dateString)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        } 
        const year = event.dateString.substring(event.dateString.length - 4); 
        if (validation.isInvalidYear(year)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        }     
        //convert due date string to Date object and make sure date is valid
    
        if (validation.isInvalidDate(event.date)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        }
            $("#message").text(event.getCountdownMessage());
        

    });
    
    $("#event").focus();
});