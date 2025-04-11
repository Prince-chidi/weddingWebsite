// Calendar and Event Functions
function addGoogleEvent(events) {
    var event;
    if(events === 'trad'){
         event = {
            title: `JoyousBen'25, Traditional Marriage`,
            description: 'Join us at our traditional marriage event!',
            location: "Our Saviour’s Chapel (OSC)<br>Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-01-30T12:00:00'),
            endDate: new Date('2025-01-30T17:00:00')
          };
    }else{
        event = {
            title: `JoyousBen'25, Wedding ceremony`,
            description: 'Join us at our wedding ceremony',
            location: "Our Saviour’s Chapel (OSC)<br>Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-02-01T10:00:00'),
            endDate: new Date('2025-02-01T17:00:00')
          };
    }
   
  
    const googleEventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}`;
    window.open(googleEventUrl, '_blank');
  }
  
  function addOutlookEvent(events) {
    var event;
    if(events === 'trad'){
         event = {
            title: `JoyousBen'25, Traditional Marriage`,
            description: 'Join us at our traditional marriage event!',
            location: "Our Saviour’s Chapel (OSC)Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-01-30T12:00:00'),
            endDate: new Date('2025-01-30T17:00:00')
          };
    }else{
        event = {
            title: `JoyousBen'25, Wedding ceremony`,
            description: 'Join us at our wedding ceremony',
            location: "Our Saviour’s Chapel (OSC) Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-02-01T10:00:00'),
            endDate: new Date('2025-02-01T17:00:00')
          };
    }
  
    const outlookEventUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&startdt=${formatOutlookDate(event.startDate)}&enddt=${formatOutlookDate(event.endDate)}`;
    window.open(outlookEventUrl, '_blank');
  }
  
  function downloadICS(events) {
    var event;
    if(events === 'trad'){
         event = {
            title: 'Traditional Marriage',
            description: 'Join us at our traditional marriage event!',
            location: "Our Saviour’s Chapel (OSC) Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-01-30T12:00:00'),
            endDate: new Date('2025-01-30T17:00:00')
          };
    }else{
        event = {
            title: 'Wedding ceremony',
            description: 'Join us at our wedding ceremony',
            location: "Our Saviour’s Chapel (OSC) Interdenominational Protestant Chaplaincy University Of Port Harcourt",
            startDate: new Date('2025-02-01T10:00:00'),
            endDate: new Date('2025-02-01T17:00:00')
          };
    }
    const icsFileContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nDTSTART:${formatDate(event.startDate)}\nDTEND:${formatDate(event.endDate)}\nEND:VEVENT\nEND:VCALENDAR`;
  
    const blob = new Blob([icsFileContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wedding_event.ics';
    link.click();
  }
  
  function formatGoogleDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  }
  
  function formatOutlookDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  }
  
  function formatDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }
  
  // Map and Directions Functions
  function initMap() {
    const location = { lat: 4.8156, lng: 7.0497 }; // Port Harcourt location
    const mapOptions = {
      zoom: 14,
      center: location,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        }
      ]
    };
  
    const map1 = new google.maps.Map(
      document.getElementById("map-container"),
      mapOptions
    );
  
    const map2 = new google.maps.Map(
      document.getElementById("map-container-2"),
      mapOptions
    );
  
    // Add markers
    new google.maps.Marker({
      position: location,
      map: map1,
      title: 'Traditional Marriage Location'
    });
  
    new google.maps.Marker({
      position: location,
      map: map2,
      title: 'Wedding Ceremony Location'
    });
  }
  
  function getDirections() {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Our Saviour’s Chapel (OSC) Interdenominational Protestant Chaplaincy University Of Port Harcourt")}`;
    window.open(directionsUrl, '_blank');
  }
  
  // Attach functions to the window object for global access
  window.addGoogleEvent = addGoogleEvent;
  window.addOutlookEvent = addOutlookEvent;
  window.downloadICS = downloadICS;
  window.getDirections = getDirections;
  window.initMap = initMap;
  