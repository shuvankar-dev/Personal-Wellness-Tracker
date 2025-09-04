# Personal Health Management System 🏥

A comprehensive web-based wellness tracking application that helps users monitor their mental health, build positive habits, and visualize their wellness journey.

## 🌟 Features

### 🏠 Home Page
- Clean, responsive landing page
- Interactive navigation with mobile hamburger menu
- Smooth scroll animations and hover effects
- Hero section with call-to-action

### 😊 Mood Tracker
- Daily mood logging with emoji-based interface
- 5 mood states: Excited, Happy, Okay, Sad, Stressed
- Optional notes for each mood entry
- Historical mood data display
- Persistent data storage (in-memory simulation)

### ✅ Habit Builder
- Create and manage daily habits
- Track habit completion with one-click marking
- Streak tracking for motivation
- Habit deletion and management
- Progress statistics and completion rates

### 📊 Progress Dashboard
- Visual charts for mood trends (last 7 days)
- Habit completion analytics
- Canvas-based chart rendering
- Interactive data visualization

### 📚 Wellness Resources
- Curated wellness tips and articles
- Filter by categories: Mental Health, Physical Health, Nutrition, Sleep
- Search functionality for finding specific resources
- Interactive wellness calculator

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with responsive design
- **Charts**: HTML5 Canvas for data visualization
- **Storage**: In-memory data simulation (can be extended to localStorage)
- **Icons**: Emoji-based interface for accessibility

## 📁 Project Structure

```
Personal Health Management System/
├── index.html          # Home page
├── mood.html           # Mood tracking page
├── habits.html         # Habit management page
├── dashboard.html      # Analytics and charts
├── resources.html      # Wellness resources
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── readme.md           # Project documentation
└── images/
    └── hero-image.jpg  # Hero section image
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required for basic functionality

### Installation
1. Clone or download the repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

### Local Development
For full functionality, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop computers (1024px and up)

## 🎨 Features Breakdown

### Navigation
- Responsive navigation bar with mobile hamburger menu
- Active page highlighting
- Smooth transitions and animations

### Mood Tracking
- Interactive mood selection with visual feedback
- Form validation for mood selection
- Chronological mood history display
- Data persistence across sessions

### Habit Management
- Dynamic habit creation and deletion
- Real-time completion tracking
- Streak calculation algorithm
- Progress statistics dashboard

### Data Visualization
- Line charts for mood trends
- Bar charts for habit completion rates
- Canvas-based rendering for smooth performance
- Responsive chart scaling

## 🔧 Code Organization

### JavaScript Architecture
- **Commented Sections**: Non-essential code for specific pages is commented out to optimize performance
- **Modular Functions**: Each feature has dedicated functions for maintainability
- **Event Handlers**: Proper event management for user interactions
- **Data Management**: Centralized data storage and retrieval functions

### CSS Structure
- **Reset Styles**: Consistent cross-browser styling
- **Component-Based**: Styles organized by page/component
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

## 🧪 Testing

To test the application:
1. Open each page and verify navigation works
2. Test mood tracking: select moods, add notes, save entries
3. Test habit management: add habits, mark complete, delete habits
4. Check responsive design on different screen sizes
5. Verify data persistence within the session

## 🚦 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📈 Future Enhancements

- [ ] Backend integration for persistent data storage
- [ ] User authentication and profiles
- [ ] Export data functionality (CSV, PDF)
- [ ] Advanced analytics and insights
- [ ] Goal setting and achievement tracking
- [ ] Social features and sharing
- [ ] Notification reminders
- [ ] Offline functionality with Service Workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shuvankar Dev**
- GitHub: [@shuvankar-dev](https://github.com/shuvankar-dev)
- Repository: [Personal-Wellness-Tracker](https://github.com/shuvankar-dev/Personal-Wellness-Tracker)

## 🙏 Acknowledgments

- Inspiration from modern wellness applications
- Emoji graphics for enhanced user experience
- Web accessibility best practices
- Responsive design methodologies

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub or contact the maintainer.

---

Made with ❤️ for better wellness tracking