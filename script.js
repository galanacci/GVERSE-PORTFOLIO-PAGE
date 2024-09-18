const texts = [
    { text: "G/VERSE, aka GALANACCI-VERSE", isStatement: false },
    { text: "A multi-disciplinary creative studio", isStatement: false },
    { text: "Founded by Francis and Marybeth", isStatement: true },
    { text: "Over eight years of partnership", isStatement: true },
    { text: "Both personal and professional", isStatement: false },
    { text: "A unique blend of skills", isStatement: false },
    { text: "A creative powerhouse!", isStatement: true },
    { text: "Specializing in creativity", isStatement: false },
    { text: "And purposeful design solutions", isStatement: true },
    { text: "This is G/VERSE.", isStatement: true }
];

const container = document.getElementById('text-container');
const typingSound = document.getElementById('typingSound');
let currentIndex = 0;

async function playTypingSound(duration) {
    if (!isMuted) {
        typingSound.currentTime = 0;
        typingSound.playbackRate = 15 / duration;
        try {
            await typingSound.play();
        } catch (error) {
            console.error("Audio playback failed:", error);
        }
    }
}

async function typeWriter(text) {
    const typingDuration = text.length * 100; // 100ms per character
    playTypingSound(typingDuration / 1000); // Convert to seconds

    for (let i = 0; i <= text.length; i++) {
        container.innerHTML = text.substring(0, i) + '<span class="cursor"></span>';
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Wait for 1.5 seconds before showing the next text
    await new Promise(resolve => setTimeout(resolve, 1500));
    showNextText();
}

function showNextText() {
    const currentText = texts[currentIndex];
    container.className = currentText.isStatement ? 'large-text' : 'small-text';
    container.innerHTML = '';
    
    typeWriter(currentText.text);
    
    currentIndex = (currentIndex + 1) % texts.length;
}

// Function to handle the Send Enquiry button click
function sendEnquiry() {
    document.getElementById('enquiry-popup').style.display = 'block';
}

// Function to open PDF files
function openPDF(filename) {
    const pdfUrl = `src/${filename}`;
    window.open(pdfUrl, '_blank', 'fullscreen=yes');
}

// Mute button functionality
let isMuted = false;
const muteButton = document.getElementById('mute-button');

function toggleMute() {
    isMuted = !isMuted;
    typingSound.muted = isMuted;
    muteButton.textContent = isMuted ? 'SOUND OFF' : 'SOUND ON';
}

// Start the animation
showNextText();

// Enquiry form functionality
document.getElementById('send-enquiry').addEventListener('click', sendEnquiry);

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('enquiry-popup').style.display = 'none';
});

document.getElementById('enquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    // For this example, we'll just log it and show an alert
    console.log('Enquiry submitted:', { name, email, message });
    alert('Thank you for your enquiry. We will get back to you soon!');
    
    // Close the popup and reset the form
    document.getElementById('enquiry-popup').style.display = 'none';
    this.reset();
});

// Close the popup if clicked outside the form
window.addEventListener('click', function(event) {
    const popup = document.getElementById('enquiry-popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});