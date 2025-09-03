// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scroll to features section
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Hero image animation on load
window.addEventListener('load', () => {
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transform = 'translateY(20px)';
        heroImg.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Feature cards hover effect with JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Simple page loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/* ====== MOOD TRACKER FUNCTIONALITY (Only needed for mood.html) ====== */
// Mood selection functionality
let selectedMood = null;

document.addEventListener('DOMContentLoaded', () => {
    // Only run mood tracker code if we're on the mood.html page
    if (document.getElementById('mood-history')) {
        loadMoodHistory();
        setupMoodSelection();
    }
});

// Handle mood option selection
function setupMoodSelection() {
    const moodOptions = document.querySelectorAll('.mood-option');
    
    moodOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            moodOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            option.classList.add('active');
            
            // Store selected mood
            selectedMood = option.getAttribute('data-mood');
        });
    });
}

// Save mood function
function saveMood() {
    if (!selectedMood) {
        alert('Please select a mood first!');
        return;
    }
    
    const notes = document.getElementById('mood-notes').value;
    const today = new Date();
    const dateString = today.toDateString();
    
    // Create mood entry
    const moodEntry = {
        date: dateString,
        mood: selectedMood,
        notes: notes,
        timestamp: today.getTime()
    };
    
    // Get existing moods from memory (simulating storage)
    let moods = getMoodsFromMemory();
    
    // Check if mood for today already exists
    const existingIndex = moods.findIndex(entry => entry.date === dateString);
    
    if (existingIndex !== -1) {
        // Update existing entry
        moods[existingIndex] = moodEntry;
        alert('Today\'s mood updated successfully!');
    } else {
        // Add new entry
        moods.push(moodEntry);
        alert('Mood saved successfully!');
    }
    
    // Save to memory
    saveMoodsToMemory(moods);
    
    // Refresh display
    displayMoodHistory(moods);
    
    // Reset form
    resetForm();
}

// Reset the form after saving
function resetForm() {
    selectedMood = null;
    document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('active'));
    document.getElementById('mood-notes').value = '';
}

// Load and display mood history
function loadMoodHistory() {
    const moods = getMoodsFromMemory();
    displayMoodHistory(moods);
}

// Display mood history
function displayMoodHistory(moods) {
    const historyContainer = document.getElementById('mood-history');
    
    if (!moods || moods.length === 0) {
        historyContainer.innerHTML = '<p class="no-data">No mood data yet. Start logging your mood above!</p>';
        return;
    }
    
    // Sort moods by date (newest first)
    moods.sort((a, b) => b.timestamp - a.timestamp);
    
    // Create HTML for mood history
    let historyHTML = '';
    moods.slice(0, 10).forEach(entry => { // Show only last 10 entries
        const emoji = getMoodEmoji(entry.mood);
        historyHTML += `
            <div class="mood-entry">
                <div class="mood-date">${entry.date}</div>
                <div class="mood-display">
                    <span class="mood-emoji-small">${emoji}</span>
                    <span class="mood-name">${capitalizeFirst(entry.mood)}</span>
                </div>
                ${entry.notes ? `<div class="mood-notes-display">"${entry.notes}"</div>` : ''}
            </div>
        `;
    });
    
    historyContainer.innerHTML = historyHTML;
}

// Get mood emoji based on mood type
function getMoodEmoji(mood) {
    const emojiMap = {
        'excited': '🤩',
        'happy': '😊',
        'okay': '😐',
        'sad': '😢',
        'stressed': '😤'
    };
    return emojiMap[mood] || '😐';
}

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Memory storage functions (simulating localStorage)
let moodData = [];

function getMoodsFromMemory() {
    return moodData;
}

function saveMoodsToMemory(moods) {
    moodData = moods;
}

// Habit management functionality
let habits = [];
let habitProgress = {};

document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    updateStats();
});

// Add new habit
function addHabit() {
    const habitInput = document.getElementById('habit-input');
    const habitText = habitInput.value.trim();
    
    if (!habitText) {
        alert('Please enter a habit!');
        return;
    }
    
    // Check if habit already exists
    if (habits.some(habit => habit.name.toLowerCase() === habitText.toLowerCase())) {
        alert('This habit already exists!');
        return;
    }
    
    // Create new habit
    const newHabit = {
        id: Date.now(),
        name: habitText,
        createdDate: new Date().toDateString(),
        completedDates: []
    };
    
    habits.push(newHabit);
    saveHabits();
    displayHabits();
    updateStats();
    
    // Clear input
    habitInput.value = '';
    
    // Show success message
    showMessage('Habit added successfully!');
}

// Display habits
function displayHabits() {
    const habitsList = document.getElementById('habits-list');
    
    if (habits.length === 0) {
        habitsList.innerHTML = '<p class="no-habits">No habits yet. Add some habits above to get started!</p>';
        return;
    }
    
    const today = new Date().toDateString();
    let habitsHTML = '';
    
    habits.forEach(habit => {
        const isCompleted = habit.completedDates.includes(today);
        const streak = calculateStreak(habit);
        
        habitsHTML += `
            <div class="habit-item ${isCompleted ? 'completed' : ''}">
                <div class="habit-content">
                    <div class="habit-name">${habit.name}</div>
                    <div class="habit-info">
                        <span class="habit-streak">🔥 ${streak} day streak</span>
                        <span class="habit-created">Added: ${habit.createdDate}</span>
                    </div>
                </div>
                <div class="habit-actions">
                    <button class="complete-btn ${isCompleted ? 'completed' : ''}" 
                            onclick="toggleHabit(${habit.id})" 
                            ${isCompleted ? 'disabled' : ''}>
                        ${isCompleted ? '✅ Done' : '⭕ Mark Done'}
                    </button>
                    <button class="delete-btn" onclick="deleteHabit(${habit.id})">🗑️</button>
                </div>
            </div>
        `;
    });
    
    habitsList.innerHTML = habitsHTML;
}

// Toggle habit completion
function toggleHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const today = new Date().toDateString();
    
    if (!habit.completedDates.includes(today)) {
        habit.completedDates.push(today);
        saveHabits();
        displayHabits();
        updateStats();
        showMessage('Great job! Habit completed! 🎉');
    }
}

// Delete habit
function deleteHabit(habitId) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(h => h.id !== habitId);
        saveHabits();
        displayHabits();
        updateStats();
        showMessage('Habit deleted successfully.');
    }
}

// Calculate streak for a habit
function calculateStreak(habit) {
    if (habit.completedDates.length === 0) return 0;
    
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    // Count consecutive days from today backwards
    while (true) {
        const dateString = currentDate.toDateString();
        if (habit.completedDates.includes(dateString)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
}

// Update statistics
function updateStats() {
    const totalHabits = habits.length;
    const today = new Date().toDateString();
    const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
    const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
    
    document.getElementById('total-habits').textContent = totalHabits;
    document.getElementById('completed-today').textContent = completedToday;
    document.getElementById('completion-rate').textContent = completionRate + '%';
}

// Show temporary message
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4a90e2;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Load habits from memory
function loadHabits() {
    // In a real app, this would load from localStorage
    // For now, we'll use an in-memory array
    habits = getHabitsFromMemory();
    displayHabits();
}

// Save habits to memory
function saveHabits() {
    saveHabitsToMemory(habits);
}

// Memory storage functions (simulating localStorage)
let habitData = [];

function getHabitsFromMemory() {
    return habitData;
}

function saveHabitsToMemory(data) {
    habitData = data;
}

// Allow Enter key to add habit
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('habit-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabit();
        }
    });
});

// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    createMoodChart();
    createHabitChart();
});

// Calculate weekly wellness score
function calculateWeeklyScore(moods, habits) {
    const last7Days = getLast7Days();
    let totalScore = 0;
    let validDays = 0;
    
    last7Days.forEach(date => {
        const dayMood = moods.find(m => m.date === date);
        const dayHabits = habits.filter(h => h.completedDates.includes(date)).length;
        const totalHabits = habits.length;
        
        if (dayMood || totalHabits > 0) {
            let dayScore = 0;
            
            // Mood contribution (0-50 points)
            if (dayMood) {
                const moodScore = getMoodScore(dayMood.mood);
                dayScore += moodScore * 0.5;
            }
            
            // Habit contribution (0-50 points)
            if (totalHabits > 0) {
                const habitScore = (dayHabits / totalHabits) * 50;
                dayScore += habitScore;
            }
            
            totalScore += dayScore;
            validDays++;
        }
    });
    
    return validDays > 0 ? Math.round(totalScore / validDays) : 0;
}

// Get mood score (0-100)
function getMoodScore(mood) {
    const scores = {
        'excited': 100,
        'happy': 80,
        'okay': 60,
        'sad': 40,
        'stressed': 30
    };
    return scores[mood] || 60;
}

// Create simple mood chart
function createMoodChart() {
    const canvas = document.getElementById('mood-chart');
    const ctx = canvas.getContext('2d');
    const moods = getMoodsFromMemory();
    const last7Days = getLast7Days();
    
    // Check if we have mood data
    const moodData = last7Days.map(date => {
        const mood = moods.find(m => m.date === date);
        return mood ? getMoodScore(mood.mood) : null;
    });
    
    const hasData = moodData.some(score => score !== null);
    
    if (!hasData) {
        document.getElementById('mood-no-data').style.display = 'block';
        canvas.style.display = 'none';
        return;
    }
    
    document.getElementById('mood-no-data').style.display = 'none';
    canvas.style.display = 'block';
    
    // Simple line chart
    drawLineChart(ctx, moodData, last7Days, 'Mood Score', '#4a90e2');
}

// Create simple habit chart
function createHabitChart() {
    const canvas = document.getElementById('habit-chart');
    const ctx = canvas.getContext('2d');
    const habits = getHabitsFromMemory();
    const last7Days = getLast7Days();
    
    if (habits.length === 0) {
        document.getElementById('habit-no-data').style.display = 'block';
        canvas.style.display = 'none';
        return;
    }
    
    document.getElementById('habit-no-data').style.display = 'none';
    canvas.style.display = 'block';
    
    // Calculate completion percentage for each day
    const habitData = last7Days.map(date => {
        const completed = habits.filter(h => h.completedDates.includes(date)).length;
        return habits.length > 0 ? (completed / habits.length) * 100 : 0;
    });
    
    // Bar chart
    drawBarChart(ctx, habitData, last7Days, 'Completion %', '#28a745');
}

// Simple line chart drawing function
function drawLineChart(ctx, data, labels, title, color) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set styles
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.font = '12px Arial';
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Filter out null values and draw line
    const validPoints = [];
    data.forEach((value, index) => {
        if (value !== null) {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = height - padding - (value / 100) * chartHeight;
            validPoints.push({x, y, value, label: labels[index]});
        }
    });
    
    if (validPoints.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.moveTo(validPoints[0].x, validPoints[0].y);
        
        for (let i = 1; i < validPoints.length; i++) {
            ctx.lineTo(validPoints[i].x, validPoints[i].y);
        }
        ctx.stroke();
        
        // Draw points
        validPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    labels.forEach((label, index) => {
        const x = padding + (index / (labels.length - 1)) * chartWidth;
        const shortLabel = label.split(' ')[1] + '/' + label.split(' ')[2];
        ctx.fillText(shortLabel, x - 15, height - 10);
    });
}

// Simple bar chart drawing function
function drawBarChart(ctx, data, labels, title, color) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw bars
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    data.forEach((value, index) => {
        const barHeight = (value / 100) * chartHeight;
        const x = padding + (index * (barWidth + barSpacing)) + barSpacing / 2;
        const y = height - padding - barHeight;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value on top of bar
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(value) + '%', x + barWidth / 2, y - 5);
    });
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + (index * (barWidth + barSpacing)) + barSpacing / 2 + barWidth / 2;
        const shortLabel = label.split(' ')[1] + '/' + label.split(' ')[2];
        ctx.fillText(shortLabel, x, height - 10);
    });
}

// Get last 7 days
function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toDateString());
    }
    return days;
}

// Utility functions (shared with other pages)
function getMoodEmoji(mood) {
    const emojiMap = {
        'excited': '🤩',
        'happy': '😊',
        'okay': '😐',
        'sad': '😢',
        'stressed': '😤'
    };
    return emojiMap[mood] || '😐';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Memory access functions
function getMoodsFromMemory() {
    // Access the mood data from mood.js
    return window.moodData || [];
}

function getHabitsFromMemory() {
    // Access the habit data from habits.js
    return window.habitData || [];
}


// Wellness resources data
const wellnessResources = [
    {
        id: 1,
        title: "5 Minute Morning Meditation",
        category: "mental",
        description: "Start your day with a simple breathing exercise to reduce stress and improve focus.",
        content: "Sit comfortably and focus on your breath for 5 minutes. Inhale for 4 counts, hold for 4, exhale for 6.",
        tips: ["Find a quiet space", "Use guided meditation apps", "Be consistent daily"]
    },
    {
        id: 2,
        title: "Hydration for Better Health",
        category: "physical",
        description: "Learn why proper hydration is crucial for your physical and mental wellbeing.",
        content: "Aim for 8 glasses of water daily. Start with a glass upon waking and keep a water bottle nearby.",
        tips: ["Add lemon for flavor", "Set hourly reminders", "Monitor urine color"]
    },
    {
        id: 3,
        title: "Balanced Meal Planning",
        category: "nutrition",
        description: "Create nutritious meals that fuel your body and support your wellness goals.",
        content: "Include protein, healthy fats, complex carbs, and vegetables in every meal. Plan ahead for success.",
        tips: ["Prep meals on Sundays", "Use the plate method", "Include colorful vegetables"]
    },
    {
        id: 4,
        title: "Better Sleep Hygiene",
        category: "sleep",
        description: "Improve your sleep quality with simple evening routine changes.",
        content: "Create a bedtime routine: dim lights, avoid screens, keep room cool, and go to bed consistently.",
        tips: ["No screens 1 hour before bed", "Keep bedroom between 60-67°F", "Try reading instead of TV"]
    },
    {
        id: 5,
        title: "Stress Management Techniques",
        category: "mental",
        description: "Simple strategies to manage daily stress and build resilience.",
        content: "Practice deep breathing, take short walks, write in a journal, and talk to friends when feeling overwhelmed.",
        tips: ["Try the 4-7-8 breathing technique", "Take 10-minute nature walks", "Keep a gratitude journal"]
    },
    {
        id: 6,
        title: "Quick Desk Exercises",
        category: "physical",
        description: "Simple exercises you can do at your desk to stay active throughout the day.",
        content: "Shoulder rolls, neck stretches, seated spinal twists, and calf raises can be done anywhere.",
        tips: ["Set hourly movement reminders", "Stand during phone calls", "Use stairs when possible"]
    },
    {
        id: 7,
        title: "Mindful Eating Practices",
        category: "nutrition",
        description: "Develop a healthier relationship with food through mindful eating techniques.",
        content: "Eat slowly, chew thoroughly, put devices away, and pay attention to hunger and fullness cues.",
        tips: ["Eat without distractions", "Use smaller plates", "Listen to your body's signals"]
    },
    {
        id: 8,
        title: "Digital Wellness",
        category: "mental",
        description: "Create healthy boundaries with technology for better mental health.",
        content: "Set specific times for checking emails and social media. Create device-free zones in your home.",
        tips: ["Turn off notifications", "Use app timers", "Charge phone outside bedroom"]
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    displayResources();
    updateCalculator();
});

// Display resources based on current filter
function displayResources() {
    const grid = document.getElementById('resources-grid');
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    let filteredResources = wellnessResources;
    
    // Filter by category
    if (currentFilter !== 'all') {
        filteredResources = filteredResources.filter(resource => resource.category === currentFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredResources = filteredResources.filter(resource => 
            resource.title.toLowerCase().includes(searchTerm) || 
            resource.description.toLowerCase().includes(searchTerm) ||
            resource.content.toLowerCase().includes(searchTerm)
        );
    }
    
    // Generate HTML
    if (filteredResources.length === 0) {
        grid.innerHTML = '<p class="no-resources">No resources found. Try a different search or filter.</p>';
        return;
    }
    
    let resourcesHTML = '';
    filteredResources.forEach(resource => {
        resourcesHTML += `
            <div class="resource-card" data-category="${resource.category}">
                <div class="resource-category">${capitalizeFirst(resource.category)}</div>
                <h3 class="resource-title">${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-content">${resource.content}</div>
                <div class="resource-tips">
                    <h4>Quick Tips:</h4>
                    <ul>
                        ${resource.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                <button class="resource-btn" onclick="toggleResourceDetails(${resource.id})">
                    Read More
                </button>
            </div>
        `;
    });
    
    grid.innerHTML = resourcesHTML;
}

// Filter resources by category
function filterByCategory(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayResources();
}

// Filter resources by search term
function filterResources() {
    displayResources();
}

// Toggle resource details (simplified version)
function toggleResourceDetails(resourceId) {
    const resource = wellnessResources.find(r => r.id === resourceId);
    if (resource) {
        alert(`${resource.title}\n\n${resource.content}\n\nTips:\n${resource.tips.join('\n')}`);
    }
}