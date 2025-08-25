// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- AI Chatbot UI Logic ---
const aiForm = document.getElementById('ai-form');
const aiInput = document.getElementById('ai-input');
const chatDisplay = document.getElementById('chat-display');
const categoryButtons = document.querySelectorAll('.category-btn');

const handleQuery = async (query) => {
     if (!query) return;

    // Add user message to chat
    addMessage(query, 'user');
    aiInput.value = '';

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
        // Call Gemini API (from ai.js)
        const aiResponse = await getAIResponse(query);
        // Remove typing indicator
        chatDisplay.removeChild(typingIndicator);
        // Add AI response to chat
        addMessage(aiResponse, 'ai');
    } catch (error) {
        console.error("Error fetching AI response:", error);
        // Remove typing indicator
        chatDisplay.removeChild(typingIndicator);
        // Show error message
        addMessage("Sorry, I'm having trouble connecting. Please try again later.", 'ai');
    }
};

aiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = aiInput.value.trim();
    handleQuery(userInput);
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const query = button.dataset.query;
        aiInput.value = query;
        handleQuery(query);
    });
});

function addMessage(text, sender) {
    const messageWrapper = document.createElement('div');
    const messageElement = document.createElement('div');
    
    messageWrapper.classList.add('flex', 'w-full');
    messageElement.classList.add('p-4', 'rounded-lg', 'max-w-xl');
    
    messageElement.innerText = text;

    if (sender === 'user') {
        messageWrapper.classList.add('justify-end');
        messageElement.classList.add('bg-indigo-600', 'text-white');
    } else {
        messageWrapper.classList.add('justify-start');
        messageElement.classList.add('bg-gray-200', 'text-gray-800');
    }
    
    messageWrapper.appendChild(messageElement);
    chatDisplay.appendChild(messageWrapper);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function addTypingIndicator() {
    const typingWrapper = document.createElement('div');
    typingWrapper.classList.add('flex', 'justify-start', 'w-full');
    typingWrapper.innerHTML = `
        <div class="bg-gray-200 text-gray-800 p-4 rounded-lg max-w-xl">
            <div class="flex items-center space-x-1">
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style="animation-delay: 0s;"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style="animation-delay: 0.4s;"></span>
            </div>
        </div>
    `;
    chatDisplay.appendChild(typingWrapper);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    return typingWrapper;
}
