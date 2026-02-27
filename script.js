// --- 1. The Real-Time Atmospheric Magic ---
function updateAtmosphere() {
    const hour = new Date().getHours();
    const filter = document.getElementById('atmosphere-filter');
    
    // Dawn (5 AM - 8 AM): Soft misty blue/pink
    if (hour >= 5 && hour < 8) {
        filter.style.backgroundColor = "rgba(173, 216, 230, 0.3)"; 
    } 
    // Day (8 AM - 4 PM): Warm, bright, minimal filter
    else if (hour >= 8 && hour < 16) {
        filter.style.backgroundColor = "rgba(255, 250, 205, 0.1)"; 
    } 
    // Dusk (4 PM - 7 PM): Golden hour, deep oranges
    else if (hour >= 16 && hour < 19) {
        filter.style.backgroundColor = "rgba(255, 140, 0, 0.3)"; 
    } 
    // Night (7 PM - 5 AM): Dark blue, mysterious
    else {
        filter.style.backgroundColor = "rgba(0, 0, 50, 0.6)"; 
    }
}

// Run immediately and check every minute
updateAtmosphere();
setInterval(updateAtmosphere, 60000);

// --- 2. The Focus Timer Logic ---
const startBtn = document.getElementById('start-walk');
const path = document.querySelector('.scrolling-path');
const storyText = document.getElementById('story-text');
const inputField = document.getElementById('task-input');

startBtn.addEventListener('click', () => {
    const task = inputField.value;
    if(!task) return;

    // Start the walking animation!
    path.style.animationPlayState = 'running';
    
    // Hide input, show story text
    inputField.style.display = 'none';
    startBtn.style.display = 'none';
    storyText.innerText = `Focusing on: ${task}. Rusty is walking...`;

    // Here is where you would trigger your Tamil/Kannada instrumental audio!
    
    // Simple 25-minute timer (1500000 ms)
    // Set to 5000 (5 seconds) just so you can test it quickly!
    setTimeout(() => {
        path.style.animationPlayState = 'paused';
        storyText.innerText = "You made it to the bazaar. Somi hands you a cup of chai.";
        // Here you would pop up the graphic novel panel!
    }, 5000); 
});
