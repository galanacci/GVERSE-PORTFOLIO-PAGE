const texts = [
    { text: "G/VERSE, aka GALANACCI-VERSE", isStatement: true },
    { text: "A multi-disciplinary studio", isStatement: false },
    { text: "Connecting the unseen dots", isStatement: true },
    { text: "Founded by Francis and Marybeth", isStatement: true },
    { text: "Over eight years of partnership", isStatement: false },
    { text: "A unique blend of skills", isStatement: false },
    { text: "A creative powerhouse!", isStatement: true },
    { text: "Specializing in creativity", isStatement: false },
    { text: "And purposeful design solutions", isStatement: true },
    { text: "This is G/VERSE.", isStatement: true }
];

const container = document.getElementById('text-container');
let currentIndex = 0;

async function typeWriter(text) {
    const typingDuration = text.length * 100; // 100ms per character

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

// Function to check if the device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Updated function to open PDF files with mobile support
function openPDF(filename) {
    const pdfUrl = `src/${filename}`;

    if (isMobile()) {
        // For mobile devices, open the PDF in the same window
        window.location.href = pdfUrl;
    } else {
        // For desktop, keep the existing iframe overlay functionality
        const pdfViewer = document.createElement('div');
        pdfViewer.id = 'pdf-viewer';
        pdfViewer.style.position = 'fixed';
        pdfViewer.style.top = '0';
        pdfViewer.style.left = '0';
        pdfViewer.style.width = '100%';
        pdfViewer.style.height = '100%';
        pdfViewer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        pdfViewer.style.zIndex = '2000';

        const iframe = document.createElement('iframe');
        iframe.src = pdfUrl + '#view=FitH';
        iframe.style.width = '90%';
        iframe.style.height = '90%';
        iframe.style.position = 'absolute';
        iframe.style.top = '5%';
        iframe.style.left = '5%';
        iframe.style.border = 'none';

        const closeButton = document.createElement('button');
        closeButton.className = 'pdf-close-button';
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.onclick = function() {
            document.body.removeChild(pdfViewer);
        };

        pdfViewer.appendChild(iframe);
        pdfViewer.appendChild(closeButton);
        document.body.appendChild(pdfViewer);

        // Function to adjust iframe size
        function adjustIframeSize() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const iframeWidth = Math.min(viewportWidth * 0.9, 1200); // Max width of 1200px
            const iframeHeight = viewportHeight * 0.9;

            iframe.style.width = `${iframeWidth}px`;
            iframe.style.height = `${iframeHeight}px`;
            iframe.style.left = `${(viewportWidth - iframeWidth) / 2}px`;
        }

        // Initial adjustment
        adjustIframeSize();

        // Adjust on window resize and orientation change
        window.addEventListener('resize', adjustIframeSize);
        window.addEventListener('orientationchange', adjustIframeSize);
    }
}

// Function to handle the Send Enquiry button click
function sendEnquiry() {
    const popup = document.getElementById('enquiry-popup');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('enquiry-popup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event listeners
document.getElementById('send-enquiry').addEventListener('click', sendEnquiry);
document.getElementById('selected-works').addEventListener('click', () => openPDF('selected-works.pdf'));
document.getElementById('services').addEventListener('click', () => openPDF('services.pdf'));

// Close button functionality - using event delegation for better reliability
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.pdf-close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            closePopup();
        });
    }
});

// Close the popup if clicked outside the form
window.addEventListener('click', function(event) {
    const popup = document.getElementById('enquiry-popup');
    if (event.target === popup) {
        closePopup();
    }
});

// Start the text animation
showNextText();
