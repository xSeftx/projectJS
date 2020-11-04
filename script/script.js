window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    
    



    // Timer
    function countTimer(deadLine){
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            const dateStop = new Date(deadLine).getTime(),
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
                if (nam >= 0 && nam < 10) { 
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
    countTimer('6 november 2020');

    // Menu
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };          
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');
        const showAnimation = () => {
            const popupAnimation = popup.animate([
              { opacity: 0 },
              { opacity: 1 },
            ], 700);
            popupAnimation.removeEventListener('finish', () => {
              popup.style.opacity = 1;
            });
            popupAnimation.addEventListener('finish', () => {
              popup.style.opacity = 1;
            });
          };

        popupBtn.forEach((elem)  => {
            elem.addEventListener('click', () => {
                if (document.documentElement.offsetWidth >= 768) showAnimation();
                popup.style.display = 'block';
            });
        });
        popupClose.addEventListener('click', () => popup.style.display = 'none');
        
    };

    togglePopUp();


    






















});

