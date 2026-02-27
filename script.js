// --- ATMOSPHERE & LIGHTING ---
function updateAtmosphere() {
    const hour = new Date().getHours();
    const filter = document.getElementById('atmosphere-filter');
    
    if (hour >= 5 && hour < 8) filter.style.backgroundColor = "rgba(173, 216, 230, 0.2)"; // Dawn
    else if (hour >= 8 && hour < 16) filter.style.backgroundColor = "rgba(255, 250, 205, 0.1)"; // Day
    else if (hour >= 16 && hour < 19) filter.style.backgroundColor = "rgba(255, 140, 0, 0.3)"; // Dusk
    else filter.style.backgroundColor = "rgba(0, 0, 30, 0.7)"; // Night
}
updateAtmosphere(); setInterval(updateAtmosphere, 60000);

// --- AUDIO ENGINE ---
// REPLACE THESE URLs with your actual mp3 links (local or hosted)
const natureAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_24564c7003.mp3'); // Example Rain/Forest
natureAudio.loop = true;
natureAudio.volume = 0.4;

const vinylMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'); // Example soft instrumental
vinylMusic.loop = true;
vinylMusic.volume = 0.6;


// --- DAYTIME TIMER LOGIC ---
const startBtn = document.getElementById('start-walk');
const path = document.getElementById('forest-path');
const storyText = document.getElementById('story-text');
const inputField = document.getElementById('task-input');
const brosStory = document.getElementById('bros-story');
const brosText = document.getElementById('bros-text');

startBtn.addEventListener('click', () => {
    const task = inputField.value;
    if(!task) return;

    // Start Walking
    path.style.animationPlayState = 'running';
    inputField.style.display = 'none';
    startBtn.style.display = 'none';
    storyText.innerText = `Focusing on: "${task}". Rusty is walking the path...`;
    
    // Start Nature Sounds
    natureAudio.play();

    // The Timer (Set to 10 seconds for testing! Change 10000 to 1500000 for 25 mins later)
    setTimeout(() => {
        path.style.animationPlayState = 'paused';
        storyText.innerText = "You made it to the bazaar.";
        brosStory.classList.remove('hidden');
        
        // Randomly choose Somi or Kishen for the reward text
        if (Math.random() > 0.5) {
            brosText.innerHTML = "<b>Somi</b> is waiting. He hands you a warm, paper-wrapped samosa. He doesn't ask why you look tired. Suddenly, the frantic buzzing in the world goes quiet.";
        } else {
            brosText.innerHTML = "<b>Kishen</b> grabs your arm, laughing. The bazaar is a tangle of yellow lights and sweet jalebis. With him pulling you along, you finally feel awake.";
        }
    }, 10000); 
});

// --- TRANSITION TO NIGHT ---
document.getElementById('go-to-night').addEventListener('click', () => {
    document.getElementById('day-container').classList.add('hidden');
    document.getElementById('night-sanctuary').classList.remove('hidden');
    natureAudio.pause(); // Pause daytime sounds
});


// --- NIGHTTIME VINYL STORE LOGIC ---
const vinylDisc = document.getElementById('vinyl-disc');
const storyEvent = document.getElementById('story-event');
const eventText = document.getElementById('event-text');
const choiceButtons = document.querySelector('.choice-buttons');
const resetBtn = document.getElementById('reset-day');

vinylDisc.addEventListener('click', () => {
    if (vinylDisc.classList.contains('spinning')) return; // Prevent clicking twice

    vinylDisc.classList.add('spinning');
    
    // Start the Tamil/Kannada music!
    vinylMusic.play();
    
    // Add soft rain in the background
    natureAudio.play(); 
    natureAudio.volume = 0.2; 

    // After 5 seconds of listening, Meena arrives
    setTimeout(() => {
        storyEvent.classList.remove('hidden');
    }, 5000);
});

function makeChoice(choice) {
    choiceButtons.classList.add('hidden'); // Hide buttons
    resetBtn.classList.remove('hidden'); // Show reset button
    
    if(choice === 'listen') {
        eventText.innerHTML = "Meena sits down, pulling her knees to her chest. The soft notes fill the dusty room. You don't say a word, and for the first time today, she doesn't have to pretend to be strong. The shared silence is enough.";
    } else if (choice === 'tea') {
        eventText.innerHTML = "You slide the warm glass toward her. She wraps her cold hands around it. She takes a sip, closes her eyes, and a tiny, almost invisible smile touches her lips. 'Thank you, Rusty,' she whispers.";
    }
}

// Optional: Reset for the next session
function resetToDawn() {
    location.reload(); // Quickest way to reset the whole app state back to morning
}
