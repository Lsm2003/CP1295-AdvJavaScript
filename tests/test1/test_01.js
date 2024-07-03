"use strict";
// CP1295 Advanced JavaScript CP1295
// window.alert("Script is running");

const $ = selector => document.querySelector(selector);

const postText = () => {

    const name_id = $("#name_id").value;
    const seats_id = $("#seats_id").value;
    const outTA = $("#output_ta_id");
    const seat_count = $("#seat_count_id").value;

    if (name_id == "") {
        $("#name_feedback_id").textContent = "Name cannot be blank";
        $("#name_id").value = "";
    } else if (seats_id == "" || parseInt(seats_id) > 4){
        $("#seats_feedback_id").textContent = "Seat must be a valid number (1..4)";
        $("#seats_id").value = "";     
    } else {
        $("#seats_feedback_id").textContent = "";
        $("#name_feedback_id").textContent = "";
        $("#seat_count_feedback_id").textContent = "";
        addSeats(seats_id, seat_count);
        outTA.value += `\n${name_id}    ${seats_id}`;
    }
    //addSeats(seats_id, seat_count);
    //outTA.value += `\n${name_id}    ${seats_id}`;
};

const clearText = () => {

    const clear_data = "";

    $("#name_id").value = clear_data;
    $("#seats_id").value = clear_data;
    $("#seat_count_id").value = clear_data;
    $("#output_ta_id").value = clear_data;
};

const addSeats = (seats_id, seat_count) => {

    if (seat_count == "") {
        seat_count = 0;
        seat_count += parseInt(seats_id);
        if (seat_count > 12){
            $("#seat_count_feedback_id").textContent = "Total seat count cannot exceed 12";
        } else {
            $("#seat_count_id").value = seat_count;
        }
        //$("#seat_count_id").value = seat_count;
    } else {
        const answer = parseInt(seat_count) + parseInt(seats_id);
        if (answer > 12) {
            $("#seat_count_feedback_id").textContent = "Total seat count cannot exceed 12";
        } else {
            $("#seat_count_id").value = answer;
            $("#seat_count_feedback_id").textContent = "";
        }
        //$("#seat_count_id").value = answer;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    $("#process_ticket_id").addEventListener("click", postText);
});

document.addEventListener("DOMContentLoaded", () => {
    $("#clear_fields_id").addEventListener("click", clearText);
});
