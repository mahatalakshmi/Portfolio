// --- Resume Data for Chatbot Context ---
const resumeData = `
    Mahata Lakshmi Ummadi
    mahata2657@gmail.com | +91 6300690175
    LinkedIn: linkedin.com/in/mahata-lakshmi-b5ba24227 | GitHub: github.com/mahatalakshmi

    SUMMARY
    Results-driven Computer Science Engineer specializing in AI, Machine Learning, and Full-Stack Development, with hands-on experience building scalable AI applications, integrating LLMs, and developing robust backend systems. Proven ability to optimize model performance, design production-grade APIs, and work in fast-paced, high-impact environments. Passionate about solving complex problems with clean, efficient code and scalable architectures.

    EDUCATION
    B.Tech, Computer Science (AI & ML) - Vellore Institute of Technology (09/2021 - Present)
    CGPA: 9.48/10 | Ranked 3rd in department
    Core Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Computer Vision, Operating Systems, Networking, OOP, REST API Development

    TECHNICAL SKILLS
    Languages: Python, Java, C++, SQL, JavaScript, C, HTML/CSS
    Frameworks/Libraries: TensorFlow, PyTorch, Scikit-learn, LangChain, OpenCV, Pandas, NumPy, Spring Boot, Django, Flask
    Cloud & Tools: Azure, AWS, Git, Docker, Kubernetes, Postman, VS Code, GitHub Actions
    Databases: MySQL, PostgreSQL, MongoDB
    Specializations: LLM Integration, Al Model Optimization, REST API Development, Computer Vision, Data Engineering, Agile Methodologies

    WORK EXPERIENCE
    Software Development Engineer Intern - Walmart Global Tech (09/2022 - Present)
    - Designed and integrated Model Context Protocol (MCP) for Al system interoperability and scalability.
    - Built a production-grade Order Management System (OMS) chatbot with MCP, improving system efficiency by 20%.
    - Collaborated in an Agile environment to deliver scalable backend APIs and optimized integration pipelines.

    AI Engineer Intern - Brain-cade Technologies Pvt. Ltd. (09/2023)
    - Tested and analyzed Large Language Models with 50+ parameters for game development.
    - Implemented LangChain-based chat sequence management, improving response accuracy by 15%.

    PROJECTS
    Lost Child Detection - (03/2024 - 05/2024)
    - Developed a face recognition system trained on 10,000 images achieving 98% accuracy.
    - Implemented real-time matching algorithms for law enforcement assistance.

    Foot Ulcer Segmentation (05/2024 - Present)
    - Created an ensemble segmentation model (Unet, Unet++, SegNet) achieving 97% accuracy and 0.8 Dice score.

    IoT Pattern Analysis - (05/2023 - 07/2023)
    - Used ESP32 + MPU9250 sensors to collect and visualize data via Django-based dashboards.
    - Achieved 80% accuracy in detecting motion patterns.

    RESEARCH
    Comparative Analysis of Models on Stock Market Price - (10/2023 - 07/2024)
    - Benchmarked 5 ML/DL models for stock prediction across 80 top stocks, achieving 95% accuracy.

    ACHIEVEMENTS
    - Meritorious Award: 3rd Rank in CSE AI & ML, VIT.
    - Stock Hackathon: 2nd Prize - LSTM-based stock prediction (87% accuracy).
    - Open Source: Developed ML-powered medical diagnostics platform (90%+ accuracy) for 3 major diseases.

    CERTIFICATIONS
    - Microsoft Certified: Azure Administrator Associate
    - Artificial Intelligence Foundations - SkillsUp
    - Programming Foundations (HTML/CSS) - Coursera
`;

let chatHistory = [];

async function getAIResponse(prompt, retries = 3, delay = 1000) {
    const fullPrompt = `You are a friendly and professional AI assistant for Mahata Lakshmi Ummadi's portfolio. Based on the following resume data, answer the user's question. Keep your answers concise and informative. If the answer is not in the resume, say that you don't have that information. \n\n---RESUME DATA---\n${resumeData}\n\n---USER QUESTION---\n${prompt}`;
    
    chatHistory.push({ role: "user", parts: [{ text: fullPrompt }] });

    const payload = {
        contents: chatHistory,
    };

    const apiKey = "AIzaSyCqHWNTI3jZpHJ9Qh4qz-t-AzgfDzsk5V8"; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 429 && retries > 0) { // Throttling
                await new Promise(res => setTimeout(res, delay));
                return getAIResponse(prompt, retries - 1, delay * 2);
            }
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            chatHistory.push({ role: "model", parts: [{ text: text }] });
            return text;
        } else {
            console.error("Unexpected API response structure:", result);
            return "I received an unusual response. Could you try rephrasing?";
        }
    } catch (error) {
        console.error('Fetch error:', error);
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delay));
            return getAIResponse(prompt, retries - 1, delay * 2);
        }
        throw error;
    }
}
