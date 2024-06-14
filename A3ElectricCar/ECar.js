"use strict";

const $ = selector => document.querySelector(selector);

var power_level = 0;
var power_level_step = 0;
const max_power_level = 100;
var master_clock = 0;
var master_clock_step = 0;
var master_interval = null;
var charge_status = 0;
var driving_status = 0;
const message = $("#message")

const tick = () => {
    master_clock += master_clock_step;
  $("#timer_id").value = master_clock;
  if ($("#battery_drain_id").checked) {

    if (power_level + (power_level_step * $("#speed_KMM_id").value) >= 0) {
      message.textContent = "Driving"
      power_level += (power_level_step * $("#speed_KMM_id").value)
      $("#battery_power_id").value = power_level
      $("#battery_min_id").value = power_level / $("#speed_KMM_id").value
    }
    else {
      message.textContent = "Battery depleted"
      power_level = 0
      $("#battery_min_id").value = power_level
      $("#battery_power_id").value = power_level
      $("#battery_drain_id").unchecked

    }
  }

  if ($("#battery_charge_id").checked) {
    if (power_level + power_level_step <= 100) {
      message.textContent = "Battery Charging"
      power_level += power_level_step
        $("#battery_power_id").value = power_level
        $("#battery_min_id").value = power_level / $("#speed_KMM_id").value
    }  
    else {
        power_level = 100
      $("#battery_power_id").value = power_level
      $("#battery_charge_id").checked = false
      message.textContent = "Battery Charged"
      $("#battery_min_id").value = power_level / $("#speed_KMM_id").value

  }
  }}

const startTimer = () => {
  message.textContent = "Simulator Started"
  master_clock_step = 1;
  master_interval = setInterval(tick, 2000);

}

const resetSystem = () => {
  clearInterval(master_interval)
  master_clock = 0
  $("#timer_id").value = master_clock;
  message.textContent = "Reset Simulator"
}

const chargeBattery = () => {
  driving_status = 0
  charge_status = 1;
  power_level_step = 12
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = true;
}

const updateKMM = () => {
  if ($("#speed_KMH_id").value > 0 && $("#speed_KMH_id").value < 241) {
    $("#speed_KMH_id").nextElementSibling.textContent = ""
  $("#speed_KMM_id").value = ($("#speed_KMH_id").value / 60)
  $("#battery_min_id").value = power_level / $("#speed_KMM_id").value
  }
  else {
    $("#speed_KMH_id").nextElementSibling.textContent = "invalid input"
  }}

const driveCar = () => {
  driving_status = 1;
  charge_status = 0;
  power_level_step = -1;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = true;
  charging_indicator.checked = false;
}

document.addEventListener("DOMContentLoaded",
  () => {
    $("#charge_battery_btn").addEventListener("click", chargeBattery);
    $("#drive_car_btn").addEventListener("click", driveCar);
    $("#start_btn").addEventListener("click", startTimer);
    $("#reset_btn").addEventListener("click", resetSystem);
    $("#speed_KMH_id").addEventListener("input", updateKMM);
  });