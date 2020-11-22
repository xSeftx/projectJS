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
                        totalValue.innerHTML= totalValue.innerHTML*1+50;   
                        
                        
                    } else if(totalValue.innerHTML*1-50 >= total){
                        totalValue.innerHTML = totalValue.innerHTML*1-50;
                        
                    }
                    else if(totalValue.innerHTML === total){
                        clearInterval(interval);
                        
                    }  
                    
                },1);               

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

    //send-ajax-form

    const sendForm = () => {        
        const statusMessage = document.createElement('div');        
        statusMessage.style.cssText = `font-size: 2rem;
                                    color: white`;
               
        
        document.querySelectorAll('form').forEach(form => {
            
            form.addEventListener('submit', e => {
                e.preventDefault();        
                
                form.appendChild(statusMessage);    
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => body[key] = val);                
                statusMessage.textContent = 'Загрузка...'; 
                
                                 
                
                postData(body)
                    .then(response => {
                        if (response.status !== 200) {
                            statusMessage.textContent = 'Что-то пошло не так!';
                            throw new Error('status network not 200.');
                            
                    }
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    statusMessage.textContent = 'Спасибо! Мы скоро с вами свяжемся!'; 
                    
                })
                .catch(error => console.error(error)); 
                
                setTimeout(() => {
                    form.querySelectorAll('input').forEach(item => {
                        item.value = '';
                    });
                }, 3000);
                
                setTimeout(() => {
                    form.removeChild(successMessage);
                }, 7000);
            });            
        
        });

        const postData = body => fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    sendForm();

    const scrollTo = () => {
        const anchors = document.querySelectorAll('a')       

        for (let anchor of anchors) {
            anchor.addEventListener('click', e => {
              e.preventDefault()              
              const blockID = anchor.getAttribute('href')              
              document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            })
          }


    };
    scrollTo();

    const inputFormPhone = () => {
        const inputPhoneValue = document.querySelectorAll('.form-phone');
        inputPhoneValue.forEach(item => {
            item.addEventListener('input', (e) => item.value = item.value.replace(/^\D \+/g, ''));    
            
        });

    };

    const inputFormMassege = () => {
        document.querySelectorAll('input[name="user_name"], input[name="user_message"]').forEach(item => {
            item.addEventListener('input', () => item.value = item.value.replace(/[^а-яА-Я \  ]/g, ''));
            
            
        });
    };    

    const inputCalculator = () => {
        const inputCalc = document.querySelectorAll('.calc-block input[type=text]');
        inputCalc.forEach((item) => {
            item.addEventListener('input', (e) => item.value = item.value.replace(/[^0-9]/g, ''));

        });

    };
    inputFormMassege();
    inputFormPhone();
    inputCalculator();


    class SliderCarousel{
        constructor({main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 3, responsive = []}){
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = document.querySelector(wrap).children;
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.options = {
                position,
                infinity,
                widthSlide: Math.floor(100 / slidesToShow),
                maxPosition: this.slides.length - this.slidesToShow,
            };
            this.responsive = responsive;
        }

        addGloClass() {
            this.main.classList.add('glo-slider');
            this.wrap.classList.add('glo-slider__wrap');
            for(const item of this.slides) {
                item.classList.add('glo-slider__item')
            }
        }

        addStyle(){
            let style = document.getElementById('sliderCarousel-style');
            if (!style) {
                style = document.createElement('style');
                style.id = 'sliderCarousel-style';
            }
            style.textContent = `
                .glo-slider{
                    overflow: hidden !important;
                }
                .glo-slider__wrap {
                    display: flex !important;
                    transidion: transform 0.5s !important;
                    will-change: transform !important;
                }
                .glo-slider__item{
                    flex: 0 0 ${this.options.widthSlide}% !important;
                    margin: auto 0 !important;
                }`            
            document.head.appendChild(style);

        }
        

        controlSlider() {            
            this.prev.addEventListener('click', this.prevSlider.bind(this));
            
            this.next.addEventListener('click', this.nextSlider.bind(this));
        }

        prevSlider() {            
            if (this.options.infinity || this.options.position > 0) {
                --this.options.position;
                if (this.options.position < 0) {
                    this.options.position = this.options.maxPosition;
                }
                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }            
        }

        nextSlider() {
            if (this.options.infinity || this.options.position < this.options.maxPosition) {
                ++this.options.position;
                if (this.options.position > this.options.maxPosition) {
                    this.options.position = 0;
                }
                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        addArrow() {
            this.prev = document.createElement('button');
            this.next = document.createElement('button');

            this.prev.className = 'slider__prev';
            this.next.className = 'slider__next';

            this.main.append(this.prev);
            this.main.append(this.next);

            const style = document.createElement('style');
            style.textContent = `
                .slider__prev,
                .slider__next {
                    margin: 0 50px;
                    border: 20px solid transparent;
                    border-radius: 35%;
                    background: transparent;
                }
                .slider__next {
                    border-left-color: #19b5fe;
                }
                .slider__prev {
                    
                    border-right-color: #19b5fe;
                }
                .slider__prev:hover{                                  
                    border-right-color: #008cf0;
                    background: transparent;
                }
                .slider__next:hover{
                    border-left-color: #008cf0;
                    background: transparent;
                }
                .slider__prev:focus,
                .slider__next:focus {
                    background: transparent;
                    outline: transparent;
                }
                `;
            document.head.append(style);
        }
        

        init(){
            
            this.addGloClass();
            this.addStyle();

            if(this.prev && this.next) {
                this.controlSlider();
            }else {
                this.addArrow();
                this.controlSlider()
            }
            
            if (this.responsive) {
                this.responseInit();
            }
            
        }

        responseInit() {
            const slidesToShowDefault = this.slidesToShow;
            const allResponse = this.responsive.map(item => item.breakpoint);
            const maxResponse = Math.max(...allResponse);

            const checkResponse = () => {
                const widthWindow = document.documentElement.clientWidth;
                if (widthWindow < maxResponse) {
                    for (let i = 0; i < allResponse.length; i++) {
                        if (widthWindow < allResponse[i]) {
                            this.slidesToShow = this.responsive[i].slidesToShow;
                            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                            this.addStyle();
                        }
                    }
                } else {
                    this.slidesToShow = slidesToShowDefault;
                    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                    this.addStyle();
                }
            };

            checkResponse();

            window.addEventListener('resize', checkResponse);
        }
    



    }

    const sliderCarousel = new SliderCarousel({
        main: '.companies-wrapper',
        wrap: '.companies-hor',       
        
        slidesToShow: 4,
        infinity: true,

        responsive: [{
            breakpoint: 1024,
            slidesToShow: 3
        },
        {   
            breakpoint: 768,
            slidesToShow: 2
        },
        {
            breakpoint: 576,
            slidesToShow: 1
        },
        ]
        });
    
    sliderCarousel.init();
});



    
























