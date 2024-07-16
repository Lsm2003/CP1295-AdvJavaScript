"use strict";

$(document).ready( () => {

    const scores = [];

    $("#add_score").click( () => {
        
        const score = parseFloat($("#score").val());
                
        if (isNaN(score) || score < 0 || score > 100) {
            $("#add_score").next().text("Score must be from 0 to 100."); 
        }
        else {
            $("#add_score").next().text("");  
            scores.push(score);
            $("#all").text(scores.join(", "));
            const total = scores.reduce( (tot, val) => tot + val, 0 );
            const avg = total/scores.length;
            $("#avg").text(avg.toFixed(2));

            const len = scores.length;
            const lastScores = (len <= 3) ? scores.slice() : scores.slice(len - 3, len); // copy last three
            lastScores.reverse();
            $("#last").text(lastScores.join(", "));
        }
        $("#score").val("");
        $("#score").focus(); 
    });

    $("#delete_score").click(()=>{
        const index = parseInt($("#delete").val())
        console.log(typeof(index))

        if (isNaN(index) || index < 0 || index > scores.length - 1) {
            $("#delete_score").next().text("Index must exist in score list."); 
        }
        else {
            $("#delete_score").next().text("");
            scores.splice(index, 1)
            $("#all").text(scores.join(", "));
        }
    })

    $("#score").focus();
});