if (window.innerWidth >= 800) {
  window.onresize =()=>{
    location.reload();
 
 }
}




function windowsize(query) {
   var windowheight = window.innerHeight;
   var  windowwidth = window.innerWidth;
     if (query === 'h') {
        return parseInt(windowheight) + "px";
     } else if (query === 'w') {
        return parseInt(windowwidth) + "px";
     }
} 
 
  sh._styles('scrollable-contentxyz',{
    h : windowsize('h'),
    w : windowsize('w')
  })


    function applyStyles(spec) {
      var presetSpec = {
         h : windowsize('h'),
         w : windowsize('w'),
         pos : 'relative',
         l : '50%',
         transform : 'translateX(-50%)',
      }
      spec = Object.assign({}, spec, presetSpec);

      if (spec) {
         
         sh._styles('main-widgets', spec);
      } else {
         sh._styles('main-widgets', presetSpec);
      }
     
    }

  function NewWidget(spec, id, className, type, src) {
   
      var widget = document.createElement(type || 'div');
      widget.classList.add('main-widgets', className);
      widget.id = id;
      widget.style.loading = 'lazy';
        if (window.innerWidth <= 800) {
          var Widget_parent = document.getElementById('bodd');
        }else{
          var Widget_parent = document.getElementById('body');
        }
       
      Widget_parent.appendChild(widget);
      if (type === 'iframe' || type === 'img') {
        widget.src = src;
        widget.style.border = 'none'
      }
      applyStyles(spec);

  }

 



   NewWidget({
      bg : 'white'
   }, 'landinpage', 'landinpage');

   NewWidget({
      
   }, 'landinpagej', 'landinpagej');

   
 
   
   sh._styles('main-widgets', {
    transition: 'all 0.5 ease-in-out'
   })

  var parent = document.getElementById('landinpage');
 
  var carousel =  document.createElement('div');
   parent.appendChild(carousel);
   var popups = document.createElement('div');
   parent.appendChild(popups);
   popups.id = 'popup'
   carousel.id = 'mages'
     if (window.innerWidth >= 801) {
      carousel.innerHTML = `
       <div id="home-page-large-banner-container">
            <div id="home-page-large-banner">
                <div id='banner1' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737744435/freepik__expand__18889_d4y9nh.png);"></div>

                <div id='banner2' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737744433/freepik__expand__18895_szgj76.png);"></div>

                <div id='banner3' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737744435/freepik__expand__18894_oshk20.png);"></div>
                <div id='banner4' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737744435/freepik__expand__18894_oshk20.png);"></div>

                

            </div>
          
            <!-- Arrow Buttons -->
             <div class="hoverarrowright">
                <div class="next-btn arrow-btn" id="next">&#8594;</div> 
             </div>

             <div class="hoverarrowleft">
                <div class="prev-btn arrow-btn" id="prev">&#8592;</div> <!-- Left arrow -->
             </div>
             <div class="carousel-indicator">
                <div class="indicator"></div>
                <div class="indicator"></div>
                <div class="indicator"></div>
             </div>
          </div>
     `;
     } else if(window.innerWidth <= 800) {
       carousel.innerHTML = `
       <div id="home-page-large-banner-container">
            <div id="home-page-large-banner">
                <div id='banner1' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737830746/DSC_6105_ytynn9.jpg);"></div>
                <div id='banner2' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737830744/DSC_6175_xurdwh.jpg);"></div>
                <div id='banner3' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737830740/DSC_6201_gfekl5.jpg);"></div>
                <div id='banner4' class="banner-contents" style="background-image: url(https://res.cloudinary.com/dqtyu2frf/image/upload/v1737830744/DSC_6175_xurdwh.jpg);"></div>
               
                

            </div>
          
            <!-- Arrow Buttons -->
             <div class="hoverarrowright">
                <div class="next-btn arrow-btn" id="next">&#8594;</div> 
             </div>

             <div class="hoverarrowleft">
                <div class="prev-btn arrow-btn" id="prev">&#8592;</div> <!-- Left arrow -->
             </div>
             <div class="carousel-indicator">
                <div class="indicator"></div>
                <div class="indicator"></div>
                <div class="indicator"></div>
             </div>
          </div>
     `;
     }
     



     const bannerContainer = document.getElementById('home-page-large-banner');
    const banners = document.querySelectorAll('.banner-contents');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    let currentIndex = 0; 
    let autoScrollInterval;  
    let scrollingForward = true; // Variable to track scroll direction
    
    // Function to scroll to the specific banner
    function scrollToBanner(index) {
        const bannerWidth = banners[0].offsetWidth;
        bannerContainer.scrollTo({
            left: bannerWidth * index,
            behavior: 'smooth'
        });
    }
    
    // Function to handle the automatic scroll logic with direction reversal
    function autoscroll() {
        
        if (scrollingForward) {
            if (currentIndex < banners.length - 1) {
                currentIndex++;
            } else {
                scrollingForward = false; // Start scrolling backward when reaching the last banner
                currentIndex--;
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                scrollingForward = true; // Start scrolling forward when reaching the first banner
                currentIndex++;
            }
        }
        scrollToBanner(currentIndex);
        arrowControl();
    }
    
    // Function to restart the automatic scroll
    function restartAutoScroll() {
        clearInterval(autoScrollInterval);  // Stop the current interval
        autoScrollInterval = setInterval(autoscroll, 7000);  // Restart with a fresh interval
    }
    
    // Next button event listener
    nextBtn.addEventListener('click', () => {
        if (currentIndex < banners.length - 1) {
            currentIndex++;
            scrollToBanner(currentIndex);
        }
        restartAutoScroll();  // Reset the auto-scroll countdown after manual navigation
    });
    
    // Previous button event listener
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToBanner(currentIndex);
        }
        restartAutoScroll();  // Reset the auto-scroll countdown after manual navigation
    });
    
    // Start the auto-scrolling when the page loads
    autoScrollInterval = setInterval(autoscroll, 7000);
    
    // Optional arrow visibility control based on index
    function arrowControl() {
        if (currentIndex === banners.length - 1) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'flex';
        } else if (currentIndex === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            prevBtn.style.display = 'flex';
        }
    }
    
    // Call arrowControl inside next and previous button handlers
    nextBtn.addEventListener('click', arrowControl);
    prevBtn.addEventListener('click', arrowControl);
    
     
    
    // Handle mouse hover over the carousel indicators
    const trigger = document.querySelector('.carousel-indicator');
    const target = document.querySelector('.next-btn');
    
    trigger.addEventListener('mouseover', () => {
        target.classList.add('showarr');
    });
    
    trigger.addEventListener('mouseout', () => {
        target.classList.remove('showarr');
    });
    
    
    
    

    

     if (window.innerWidth >= 801) {
      popups.innerHTML = `
      <div id="event-details" style="text-align: center; width: 60%; font-family: "Poppins", sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; line-height: 2;">
  <p style="margin: 10px; font-size: 1.5rem;">
    <i class="fas fa-calendar-alt" style="margin-right: 8px;"></i>Saturday, February 1st, 2025
  </p>
  <p style="margin: 0; font-size: 1rem;">
    <i class="fas fa-location-dot" style="margin-right: 8px;"></i>Our Saviour’s Chapel (OSC)
    Interdenominational Protestant Chaplaincy University Of Port Harcourt
  </p>
</div>

<div id="countdown">
    <span>0</strong>Days</span>
    <span><strong>0</strong>Hours</span>
    <span><strong>0</strong>Minutes</span>
    <span><strong>0</strong>Seconds</span>
  </div>

  <button onclick="window.location.href='/rsvp'">
  RSVP
  <div class="star-1">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-2">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-3">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-4">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-5">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-6">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
</button>

      `
     } else if (window.innerWidth <= 800){
      popups.innerHTML = `

   


 <div id="countdown">
    <span><strong>0</strong>Days</span>
    <span><strong>0</strong>Hours</span>
    <span><strong>0</strong>Minutes</span>
    <span><strong>0</strong>Seconds</span>
  </div>
  
  
  
  
<button onclick="window.location.href='/rsvp'">
  RSVP
  <div class="star-1">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-2">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-3">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-4">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-5">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
  <div class="star-6">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 784.11 815.53"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          class="fil0"
        ></path>
      </g>
    </svg>
  </div>
</button>

  
  
  
  
  
  `

  
     }


  // Select the countdown container
const countdownElement = document.getElementById("countdown");

// Set the event date (February 1, 2025, midnight)
const eventDate = new Date("2025-02-01T10:00:00").getTime();

// Update the countdown every second
const timerInterval = setInterval(() => {
  // Get the current time
  const now = new Date().getTime();

  // Calculate the difference between the event date and the current time
  const timeDifference = eventDate - now;

  // Check if the event date has passed
  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    countdownElement.innerHTML = "<span>Event has ended!</span>";
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the result in the countdown element
  countdownElement.innerHTML = `
    <span><strong>${days}</strong>Days</span>
    <span><strong>${hours}</strong>Hours</span>
    <span><strong>${minutes}</strong>Minutes</span>
    <span><strong>${seconds}</strong>Seconds</span>
  `;
}, 1000);


     if (window.innerWidth <= 800 ) {
      var mobileDetailPlaceholder = document.createElement('div');
      mobileDetailPlaceholder.id = 'mobile-detail-placeholder';
      mobileDetailPlaceholder.innerHTML = `
       <div id="event-details" style="text-align: left; height: fit-content; border-left: 4px solid #ff4400; width: 100%; font-family: "Poppins", sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; line-height: 2;">
  <p style="margin: 10px; font-size: 1rem;">
    <i class="fas fa-calendar-alt" style="margin-right: 8px;"></i>Saturday, February 1st, 2025
  </p>
  
</div>
      `
      parent.appendChild(mobileDetailPlaceholder);
     }

     var CoupleName =  document.createElement('div');
     CoupleName.id = 'CoupleName';
     parent.appendChild(CoupleName);
     CoupleName.innerHTML = `<h1>Joy<span style=" color: #ff4400;"> & </span>Benjamin</h1>`;

   

     var writeup =  document.createElement('div');
     writeup.id = 'writeup';
     parent.appendChild(writeup);
     if (window.innerWidth <= 800 ) {
       writeup.innerHTML = `
       
         <p style="margin: 0; font-size: 1rem;">
    <i class="fas fa-location-dot" style="margin-right: 8px;"></i>Our Saviour’s Chapel (OSC)
    Interdenominational Protestant Chaplaincy University Of Port Harcourt
  </p>
        
       `
     }
     var writeup2 =  document.createElement('div');
     writeup2.id = 'writeup2';
     parent.appendChild(writeup2);
     if (window.innerWidth >= 801 ) {
       writeup.innerHTML = `
        <div id="tnxtxt" style="text-align: left; height: fit-content; border-left: 5px solid #ff4400; width: 40%; font-family: "Poppins", sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; line-height: 2;">
         <p style="margin: 10px; font-size: 1rem;">
         We can't wait to share our special day with you. Help us capture our wedding with Joy.
    </p>
        </div>
       `
     }

     const menubtn = document.createElement('div');
     const menupage = document.getElementById('landinpagej');
     menubtn.id = 'menubtn';
     menubtn.className = 'btn';
     menubtn.innerHTML = `<i class="fas fa-bars" style="color : white;"></i> MENU`;
     parent.appendChild(menubtn);
    

   
     
     
    
      const Menu_el = document.createElement('div');
      Menu_el.id = 'menu-widget';
      menupage.appendChild(Menu_el);

      var backBTN = document.createElement('div');
        backBTN.id = 'back-btn';
        backBTN.innerHTML = `<i class="fas fa-arrow-left" style="color : white;"></i> Back`
        Menu_el.appendChild(backBTN);
        backBTN.onclick = () => {
          parent.scrollIntoView({ behavior: 'smooth' });
        };
    var contNav = document.createElement('div');
    contNav.id = 'contNav';
      Menu_el.appendChild(contNav);
      if (window.innerWidth <= 800) {
        contNav.innerHTML = `
     <a href="/toast" class="menu-item" id="menu-toast">Toast 🥂💍</a>
     <a href="/schedule" class="menu-item" id="menu-schedule">Schedule 📅🕒</a>
      <a href="/crew" class="menu-item" id="menu-guests">Wedding Crew👰🤵💐</a>
      <a href="/support" class="menu-item" id="menu-support">Support Us 💖💵</a>
      <a href="moments" class="menu-item" id="menu-moments">Moments ✨📸</a>
      <a href="/stream2" class="menu-item" id="menu-livestream">Livestream Event 🎥📡</a>
    
     
       `
      } else {
        contNav.innerHTML = `
       
     <a href="/toast" class="menu-item" id="menu-toast">Toast 🥂💍</a>
     <a href="/schedule" class="menu-item" id="menu-schedule">Schedule 📅🕒</a>
      <a href="/crew" class="menu-item" id="menu-guests">Wedding Crew 👰🤵🎩💐</a>
      <a href="/support" class="menu-item" id="menu-support">Support Us 💖💵</a>
      <a href="/moments" class="menu-item" id="menu-moments">Moments ✨📸</a>
      <a href="/stream2" class="menu-item" id="menu-livestream">Livestream Event 🎥📡</a>
    
      
    
   
       `
      }
     

      // Attach click behavior for smooth scrolling to the parent container
      menubtn.onclick = () => {
        menupage.scrollIntoView({ behavior: 'smooth' });
      };
    
      // Set up the sliding effect for the menu element
      setupSlidingEffect('landinpagej', 'menu-widget');
    
      const ringA = document.createElement('div');
      const ringB = document.createElement('div');
      ringA.className = 'ring';
      ringB.className = 'ring';
      ringA.id = 'ringA';
      ringB.id = 'ringB';

      if (window.innerWidth >= 801) {
             menupage.appendChild(ringA);
             menupage.appendChild(ringB);
             ringA.style.height = window.innerWidth * 0.18 + 'px';
             ringA.style.width = window.innerWidth * 0.18 + 'px';
             ringB.style.height = window.innerWidth * 0.18 + 'px';
             ringB.style.width = window.innerWidth * 0.18 + 'px';
      } else if(window.innerWidth <= 800) {
             Menu_el.appendChild(ringA);
             Menu_el.appendChild(ringB);
             ringA.style.height = Menu_el.offsetWidth * 0.35 + 'px';
             ringA.style.width = Menu_el.offsetWidth * 0.35 + 'px';
             ringB.style.height = Menu_el.offsetWidth * 0.35 + 'px';
             ringB.style.width = Menu_el.offsetWidth * 0.35 + 'px';

             console.log(ringA.style.height)
      }


    function setupSlidingEffect(parentId, elementId) {
      const parentElement = document.getElementById(parentId);
      const slidingElement = document.getElementById(elementId);
    
      if (!parentElement || !slidingElement) {
        console.error(
          `Either the parent element with ID "${parentId}" or the sliding element with ID "${elementId}" is missing.`
        );
        return;
      }
    
      // Add the smooth transition class initially
      slidingElement.classList.add('smoothslide');
    
      // Observe the parent element for its visibility in the viewport
      observeElementInView(
        parentId,
        () => {
          // Parent is in view
          slidingElement.classList.remove('slidedown');
          slidingElement.classList.add('slideup');
        },
        () => {
          // Parent is out of view
          slidingElement.classList.remove('slideup');
          slidingElement.classList.add('slidedown');
        }
      );
    }
    
    // Intersection Observer logic for observing element visibility
    function observeElementInView(elementId, onEnterView, onExitView) {
      const targetElement = document.getElementById(elementId);
    
      if (!targetElement) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
      }
    
      // Create the Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
             
              onEnterView();

              sh.styles('landinpagej',{
                h : windowsize('h'),
                w : windowsize('w')
              })
          } else if (entry.isIntersecting && entry.intersectionRatio <= 0.1) {
              
              onExitView();
          } else {
              onExitView();
          }
          });
        },
        {
          root: null, // Observes in the viewport
          threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Thresholds from 0% to 100%
        }
      );
    
      // Observe the target element
      observer.observe(targetElement);
    }
    

    
   


   
