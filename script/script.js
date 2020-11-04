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

                // let idInterval = setInterval(updateClock, 1000);
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
            menu = document.querySelector('menu');            
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };  
        
        btnMenu.addEventListener('click', (event) => handlerMenu());
            
        menu.addEventListener('click', (event) => {
            if (!event.target.classList.contains('active-menu')) handlerMenu();
        });
            
    };             

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn');        
        const showAnim = () => {
            const popUpAnimation = popUp.animate([
              { opacity: 0 },
              { opacity: 1 },
            ], 700);
            popUpAnimation.removeEventListener('finish', () => {
              popUp.style.opacity = 1;
            });
            popUpAnimation.addEventListener('finish', () => {
              popUp.style.opacity = 1;
            });
        };

        popUpBtn.forEach((elem)  => {
            elem.addEventListener('click', () => {
                if (document.documentElement.offsetWidth >= 768) showAnim(); popUp.style.display = 'block';
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if(!target){
                    popUp.style.display = 'none';                
                }
            }
            
        });
        
        
    };

    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

});



    
























