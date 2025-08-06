// Global Variables
let currentQuizQuestion = 0;
let quizAnswers = { science: 0, commerce: 0, arts: 0 };
let isTyping = false;

// Sample Data
const careers = [
    {
        id: 1,
        title: "Data Scientist",
        stream: "Science/Commerce",
        description: "Analyze complex data to help organizations make informed decisions",
        salary: "₹12-25 LPA",
        duration: "4-6 years",
        difficulty: "High",
        skills: ["Python", "Statistics", "Machine Learning"],
        icon: "fas fa-chart-bar"
    },
    {
        id: 2,
        title: "Software Engineer",
        stream: "Science/Commerce",
        description: "Design and develop software applications and systems",
        salary: "₹8-20 LPA",
        duration: "4 years",
        difficulty: "Medium",
        skills: ["Programming", "Problem Solving", "Algorithms"],
        icon: "fas fa-code"
    },
    {
        id: 3,
        title: "Doctor",
        stream: "Science (PCB)",
        description: "Diagnose and treat patients, save lives and improve health",
        salary: "₹10-50 LPA",
        duration: "5.5 years",
        difficulty: "Very High",
        skills: ["Medical Knowledge", "Empathy", "Decision Making"],
        icon: "fas fa-stethoscope"
    },
    {
        id: 4,
        title: "Chartered Accountant",
        stream: "Commerce",
        description: "Manage financial records, auditing, and taxation",
        salary: "₹8-30 LPA",
        duration: "4-5 years",
        difficulty: "High",
        skills: ["Accounting", "Taxation", "Financial Analysis"],
        icon: "fas fa-calculator"
    },
    {
        id: 5,
        title: "Graphic Designer",
        stream: "Arts/Any",
        description: "Create visual content for digital and print media",
        salary: "₹3-12 LPA",
        duration: "3-4 years",
        difficulty: "Medium",
        skills: ["Creativity", "Design Software", "Visual Communication"],
        icon: "fas fa-paint-brush"
    },
    {
        id: 6,
        title: "Civil Engineer",
        stream: "Science (PCM)",
        description: "Design and supervise construction of infrastructure projects",
        salary: "₹6-18 LPA",
        duration: "4 years",
        difficulty: "Medium-High",
        skills: ["Engineering", "Project Management", "Problem Solving"],
        icon: "fas fa-hard-hat"
    }
];

const successStories = [
    {
        name: "Priya Sharma",
        role: "Data Scientist at Google",
        avatar: "P",
        story: "Started with PCM in 12th, pursued B.Tech in Computer Science, and specialized in Machine Learning. Now working on AI projects that impact millions of users.",
        path: "12th PCM → B.Tech CS → ML Specialization → Google"
    },
    {
        name: "Rahul Gupta",
        role: "Chartered Accountant",
        avatar: "R",
        story: "Chose Commerce stream, cleared CA in first attempt, and now runs his own practice with 50+ clients. Financial independence achieved by age 25.",
        path: "12th Commerce → B.Com → CA → Own Practice"
    },
    {
        name: "Ananya Patel",
        role: "Creative Director",
        avatar: "A",
        story: "Arts student who pursued Fine Arts, worked in advertising agencies, and now leads creative campaigns for major brands.",
        path: "12th Arts → BFA → Advertising → Creative Director"
    }
];

const quizQuestions = [
    {
        question: "What interests you the most?",
        options: [
            { text: "Scientific experiments and research", stream: "science" },
            { text: "Business and finance", stream: "commerce" },
            { text: "Creative arts and literature", stream: "arts" }
        ]
    },
    {
        question: "Which activity do you enjoy?",
        options: [
            { text: "Solving mathematical problems", stream: "science" },
            { text: "Managing money and investments", stream: "commerce" },
            { text: "Writing stories or creating art", stream: "arts" }
        ]
    },
    {
        question: "Your ideal work environment is:",
        options: [
            { text: "Laboratory or research facility", stream: "science" },
            { text: "Corporate office or bank", stream: "commerce" },
            { text: "Creative studio or cultural center", stream: "arts" }
        ]
    },
    {
        question: "You prefer subjects that are:",
        options: [
            { text: "Logic and fact-based", stream: "science" },
            { text: "Practical and application-oriented", stream: "commerce" },
            { text: "Expressive and interpretive", stream: "arts" }
        ]
    },
    {
        question: "Your career goal is to:",
        options: [
            { text: "Discover new things and innovate", stream: "science" },
            { text: "Build wealth and manage businesses", stream: "commerce" },
            { text: "Express creativity and inspire others", stream: "arts" }
        ]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Setup event listeners
    setupEventListeners();
    
    // Start typewriter effect
    startTypewriter();
    
    // Populate careers
    populateCareers();
    
    // Populate success stories
    populateSuccessStories();
    
    // Animate counters
    animateCounters();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
}

function setupEventListeners() {
    // Navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('career-search');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCareers();
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function startTypewriter() {
    const texts = [
        "Find Your Perfect Stream",
        "Discover Dream Careers",
        "Build Your Success Roadmap",
        "Explore Global Opportunities"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function type() {
        if (isTyping) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current).toLocaleString();
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function populateCareers() {
    const careersGrid = document.getElementById('careers-grid');
    
    careers.forEach(career => {
        const careerCard = createCareerCard(career);
        careersGrid.appendChild(careerCard);
    });
}

function createCareerCard(career) {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="career-header">
            <div class="career-icon">
                <i class="${career.icon}"></i>
            </div>
            <div>
                <div class="career-title">${career.title}</div>
                <div class="career-stream">${career.stream}</div>
            </div>
        </div>
        <div class="career-description">${career.description}</div>
        <div class="career-stats">
            <div class="career-stat">
                <i class="fas fa-rupee-sign"></i>
                <span>${career.salary}</span>
            </div>
            <div class="career-stat">
                <i class="fas fa-clock"></i>
                <span>${career.duration}</span>
            </div>
            <div class="career-stat">
                <i class="fas fa-signal"></i>
                <span>${career.difficulty}</span>
            </div>
            <div class="career-stat">
                <i class="fas fa-users"></i>
                <span>High Demand</span>
            </div>
        </div>
        <div class="career-tags">
            ${career.skills.map(skill => `<span class="career-tag">${skill}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => openCareerDetail(career));
    
    return card;
}

function populateSuccessStories() {
    const storiesSlider = document.getElementById('stories-slider');
    
    successStories.forEach((story, index) => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.setAttribute('data-aos', 'fade-up');
        storyCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        storyCard.innerHTML = `
            <div class="story-header">
                <div class="story-avatar">${story.avatar}</div>
                <div class="story-info">
                    <h4>${story.name}</h4>
                    <div class="story-role">${story.role}</div>
                </div>
            </div>
            <div class="story-content">${story.story}</div>
            <div class="story-path">
                <h5>Success Path:</h5>
                <p>${story.path}</p>
            </div>
        `;
        
        storiesSlider.appendChild(storyCard);
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        if (icon) icon.className = 'fas fa-sun';
    }
}

// Search functionality
function searchCareers() {
    const searchTerm = document.getElementById('career-search').value.toLowerCase();
    if (!searchTerm) return;
    
    // Filter careers based on search term
    const filteredCareers = careers.filter(career =>
        career.title.toLowerCase().includes(searchTerm) ||
        career.description.toLowerCase().includes(searchTerm) ||
        career.stream.toLowerCase().includes(searchTerm) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    // Update careers grid
    const careersGrid = document.getElementById('careers-grid');
    careersGrid.innerHTML = '';
    
    if (filteredCareers.length === 0) {
        careersGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No careers found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
    } else {
        filteredCareers.forEach(career => {
            const careerCard = createCareerCard(career);
            careersGrid.appendChild(careerCard);
        });
    }
    
    // Scroll to careers section
    scrollToSection('careers');
}

function searchQuery(query) {
    document.getElementById('career-search').value = query;
    searchCareers();
}

// Stream exploration
function exploreStream(streamType) {
    const streamCareers = careers.filter(career => 
        career.stream.toLowerCase().includes(streamType)
    );
    
    const careersGrid = document.getElementById('careers-grid');
    careersGrid.innerHTML = '';
    
    streamCareers.forEach(career => {
        const careerCard = createCareerCard(career);
        careersGrid.appendChild(careerCard);
    });
    
    scrollToSection('careers');
}

// Quiz functionality
function openQuiz() {
    currentQuizQuestion = 0;
    quizAnswers = { science: 0, commerce: 0, arts: 0 };
    document.getElementById('quiz-modal').style.display = 'block';
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    const quizContainer = document.getElementById('quiz-container');
    
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectAnswer('${option.stream}', ${index})">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    updateQuizProgress();
}

function selectAnswer(stream, optionIndex) {
    quizAnswers[stream]++;
    currentQuizQuestion++;
    
    if (currentQuizQuestion < quizQuestions.length) {
        displayQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const maxScore = Math.max(...Object.values(quizAnswers));
    const recommendedStream = Object.keys(quizAnswers).find(
        stream => quizAnswers[stream] === maxScore
    );
    
    const streamNames = {
        science: 'Science Stream',
        commerce: 'Commerce Stream',
        arts: 'Arts/Humanities Stream'
    };
    
    const streamDescriptions = {
        science: 'Perfect for students interested in research, technology, medicine, and engineering. Subjects include Physics, Chemistry, Biology, and Mathematics.',
        commerce: 'Ideal for future business leaders, entrepreneurs, and finance professionals. Subjects include Accounting, Economics, and Business Studies.',
        arts: 'Great for creative minds interested in literature, social sciences, and humanities. Subjects include History, Geography, Psychology, and Languages.'
    };
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-result">
            <div class="result-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h3>Recommended Stream</h3>
            <h2 class="recommended-stream">${streamNames[recommendedStream]}</h2>
            <p class="stream-description">${streamDescriptions[recommendedStream]}</p>
            <div class="result-actions">
                <button class="btn btn-primary" onclick="exploreStream('${recommendedStream}'); closeModal('quiz-modal')">
                    Explore ${streamNames[recommendedStream]}
                </button>
                <button class="btn btn-secondary" onclick="openQuiz()">
                    Retake Quiz
                </button>
            </div>
        </div>
    `;
    
    // Hide progress bar
    document.querySelector('.quiz-progress').style.display = 'none';
}

function updateQuizProgress() {
    const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
    document.getElementById('quiz-counter').textContent = `${currentQuizQuestion + 1} / ${quizQuestions.length}`;
}

// Career detail modal
function openCareerDetail(career) {
    const modal = document.getElementById('career-modal');
    const content = document.getElementById('career-detail-content');
    
    content.innerHTML = `
        <div class="career-detail-header">
            <div class="career-detail-icon">
                <i class="${career.icon}"></i>
            </div>
            <div class="career-detail-info">
                <h2>${career.title}</h2>
                <div class="career-detail-stream">${career.stream}</div>
            </div>
        </div>
        
        <div class="career-detail-grid">
            <div class="detail-item">
                <i class="fas fa-rupee-sign"></i>
                <h4>Average Salary</h4>
                <p>${career.salary}</p>
            </div>
            <div class="detail-item">
                <i class="fas fa-clock"></i>
                <h4>Duration</h4>
                <p>${career.duration}</p>
            </div>
            <div class="detail-item">
                <i class="fas fa-signal"></i>
                <h4>Difficulty</h4>
                <p>${career.difficulty}</p>
            </div>
            <div class="detail-item">
                <i class="fas fa-graduation-cap"></i>
                <h4>Education</h4>
                <p>Bachelor's + Specialization</p>
            </div>
        </div>
        
        <div class="career-description-full">
            <h3>About This Career</h3>
            <p>${career.description}</p>
        </div>
        
        <div class="career-skills">
            <h3>Required Skills</h3>
            <div class="skills-list">
                ${career.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="career-roadmap">
            <h3>Career Roadmap</h3>
            <div class="roadmap-steps">
                ${generateRoadmapSteps(career).map((step, index) => `
                    <div class="roadmap-step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">
                            <h5>${step.title}</h5>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="career-actions">
            <button class="btn btn-primary" onclick="openRoadmaps()">
                <i class="fas fa-route"></i>
                Detailed Roadmap
            </button>
            <button class="btn btn-secondary" onclick="openComparison()">
                <i class="fas fa-balance-scale"></i>
                Compare Careers
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function generateRoadmapSteps(career) {
    // Generate basic roadmap steps based on career type
    const commonSteps = [
        {
            title: "Complete 12th Grade",
            description: `Choose ${career.stream} stream with relevant subjects`
        },
        {
            title: "Entrance Exams",
            description: "Prepare for and clear relevant entrance examinations"
        },
        {
            title: "Bachelor's Degree",
            description: "Complete undergraduate program in related field"
        },
        {
            title: "Skill Development",
            description: `Master key skills: ${career.skills.join(', ')}`
        },
        {
            title: "Practical Experience",
            description: "Gain internships, projects, or entry-level positions"
        },
        {
            title: "Career Growth",
            description: "Advance to senior positions and specialize further"
        }
    ];
    
    return commonSteps;
}

// Tool functions
function openRoadmaps() {
    alert('Career Roadmaps feature coming soon! This will show detailed step-by-step visual guides for each career path.');
}

function openComparison() {
    alert('Career Comparison tool coming soon! This will allow you to compare multiple careers side-by-side.');
}

function openScholarships() {
    alert('Scholarship Finder coming soon! This will help you find scholarships based on your profile and needs.');
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Advanced search with AI-like responses
function handleAdvancedSearch(query) {
    const lowerQuery = query.toLowerCase();
    
    // Pattern matching for common queries
    if (lowerQuery.includes('pilot') || lowerQuery.includes('aviation')) {
        return [{
            title: "Commercial Pilot",
            stream: "Science (PCM)",
            description: "Fly commercial aircraft and ensure passenger safety",
            salary: "₹15-80 LPA",
            duration: "3-4 years",
            difficulty: "High",
            skills: ["Flying Skills", "Navigation", "Communication"],
            icon: "fas fa-plane"
        }];
    }
    
    if (lowerQuery.includes('doctor') || lowerQuery.includes('medical')) {
        return careers.filter(career => career.title.toLowerCase().includes('doctor'));
    }
    
    if (lowerQuery.includes('engineer')) {
        return careers.filter(career => career.title.toLowerCase().includes('engineer'));
    }
    
    if (lowerQuery.includes('high salary') || lowerQuery.includes('highest paying')) {
        return careers.sort((a, b) => {
            const salaryA = parseInt(a.salary.match(/\d+/)[0]);
            const salaryB = parseInt(b.salary.match(/\d+/)[0]);
            return salaryB - salaryA;
        });
    }
    
    // Default search
    return careers.filter(career =>
        career.title.toLowerCase().includes(lowerQuery) ||
        career.description.toLowerCase().includes(lowerQuery) ||
        career.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
}

// Progressive Web App functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Load theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

// Smooth scroll behavior for all internal links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('[data-aos]');
    elementsToObserve.forEach(el => observer.observe(el));
});

// Add CSS for additional animations and styles
const additionalStyles = `
<style>
.no-results {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
    grid-column: 1 / -1;
}

.no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--text-muted);
}

.quiz-result {
    text-align: center;
    padding: 2rem 0;
}

.result-icon {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.recommended-stream {
    color: var(--primary-color);
    margin: 1rem 0;
    font-size: 1.8rem;
}

.stream-description {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
}

.result-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.career-description-full {
    margin: 2rem 0;
}

.career-description-full h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.career-skills {
    margin: 2rem 0;
}

.career-skills h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    background: var(--gradient-primary);
    color: var(--bg-primary);
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 500;
}

.career-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: var(--shadow-secondary);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 3000;
    border-left: 4px solid var(--primary-color);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    border-left-color: #4caf50;
}

.notification-error {
    border-left-color: #f44336;
}

.notification button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0;
    margin-left: auto;
}

.notification button:hover {
    color: var(--text-primary);
}

@media (max-width: 768px) {
    .result-actions,
    .career-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .notification {
        right: 10px;
        left: 10px;
        width: auto;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Export functions for global access
window.streamQuest = {
    openQuiz,
    openRoadmaps,
    openComparison,
    openScholarships,
    searchCareers,
    searchQuery,
    exploreStream,
    scrollToSection,
    toggleTheme,
    closeModal
};
