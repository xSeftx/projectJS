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

                const idInterval = setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(timer);
            }
            
            
        }

        updateClock();
    }
    countTimer('9 november 2020');

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

        //слайдер
        const slider = () => {

            const slide = document.querySelectorAll('.portfolio-item'),
                btn = document.querySelectorAll('.potfolio-btn'),
                
                slider = document.querySelector('.portfolio-content'),
                dots = document.querySelector('.portfolio-dots');
            let currentSlide = 0,
                interval;
            
            const addDots = () => {        
                        
                for(let i = 0; i<slide.length; i++){
                    let li = document.createElement('li');
                    if (i===0){                    
                        li.classList.add('dot', 'dot-active');
                        
                    }else {                        
                        li.classList.add('dot');                        
                    }
                    dots.append(li);                   
                }                    
            }; 
            addDots();            
            const dot = document.querySelectorAll('.dot');
            
            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            const autoPlaySlide = () => {

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                currentSlide++;
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            };

            const startSlide = (time=3000) => {
               interval = setInterval(autoPlaySlide, time);
            };

            const stopSlide = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (event) => {
                event.preventDefault();

                let target = event.target;

                if(!target.matches('.portfolio-btn, .dot')){
                    return;
                }

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if(target.matches('#arrow-right')) {
                    currentSlide++;
                }else if(target.matches('#arrow-left')) {
                    currentSlide--;
                }else if (target.matches('.dot')) {
                    dot.forEach((elem, index) => {
                        if (elem === target){
                            currentSlide = index;
                        }
                    });
                }

                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }

                if(currentSlide < 0){
                    currentSlide = slide.length-1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');

            });

            slider.addEventListener('mouseover', (event) => {
                if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                    stopSlide();
                }
            });

            slider.addEventListener('mouseout', (event) => {
                if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                    startSlide();
                }
            });
            
            startSlide(20000);

        };

        slider();


    };

    tabs();

    // Наша команда
    const dataImg = () => {
        const getImg = document.querySelectorAll('.command__photo');
        getImg.forEach((item) => {  
            const photoSrc = item.src;       
            item.addEventListener('mouseover', () => {
                item.src = item.dataset.img;                
            });
            item.addEventListener('mouseout', () => { 
                item.src = photoSrc;
             });
             
        });
    };
    dataImg();

    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');        

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;                
            const squareValue = +calcSquare.value,
                typeValue = calcType.options[calcType.selectedIndex].value;

            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            }else if(calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }


            if(typeValue && squareValue){
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            

            if(total){
                const interval = setInterval(function(){
                    if(totalValue.innerHTML*1+50 <= total){
                        totalValue.innerHTML= totalValue.
                        innerHTML*1+50;
                    } else if(totalValue.innerHTML*1-50 >= total){
                        totalValue.innerHTML = totalValue.innerHTML*1-50;
                    }
                    else{
                        clearInterval(interval);
                    }   
                });
            

            }
            
        };        
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
                countSum();
            }

        });

    };

    calc();


    const inputCalculator = () => {
        const inputCalc = document.querySelectorAll('.calc-block input[type=text]');
        inputCalc.forEach((item) => {
            item.addEventListener('input', (e) => item.value = item.value.replace(/[^0-9]/g, ''));

        });

    };
    inputCalculator();

});



    
























