window.addEventListener('DOMContentLoaded', function(){
    'use strict';

// Timer
function countTimer(deadLine){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
        let dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock(){
        let timer = getTimeRemaining(); 
        let getZero = function(nam){
            if (nam > 0 && nam < 10) { 
                return '0' + nam;
            } else {
                return nam;
            }
            };       
        timerHours.textContent = getZero(timer.hours);
        timerMinutes.textContent = getZero(timer.minutes);
        timerSeconds.textContent = getZero(timer.seconds);

        if(timer.timeRemaining > 0){

            let idInterval = setInterval(updateClock, 1000);
        } else {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            // clearInterval(idInterval);
        }
        
        
    }

    updateClock();
}

countTimer('3 november 2020');



















});

