# ⛷️ Prepare to Ski

A beautiful, TV-friendly workout timer app designed for a 40-day ski trip preparation challenge. Built with React + Vite.

![Prepare to Ski](https://img.shields.io/badge/React-19-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite) ![License](https://img.shields.io/badge/License-MIT-green)

**[🎿 Live Demo](https://prepare-to-ski.netlify.app)**

## 🎿 What is this?

An 18-minute daily workout routine specifically designed to prepare your body for skiing. The routine focuses on:

- **Endurance** - Wall sits and squats for those long downhill runs
- **Lateral Movement** - Cossack squats and lateral lunges to prepare for carving
- **Core Stability** - Planks and Russian twists for balance
- **Proprioception** - Single-leg stands with eyes closed to simulate "flat light" conditions
- **Flexibility** - Hip openers and stretches for mobility

## ✨ Features

- 🎯 **Follow-along timer** - Just start and follow the exercises
- 🔊 **Audio cues** - Gentle beeps at 3, 2, 1 seconds before each exercise ends
- 📱 **Responsive design** - Works on TV, desktop, tablet, and mobile
- ⏸️ **Click to pause** - Tap the timer to pause/resume
- 📋 **Timeline sidebar** - See all exercises, jump to any one
- 🌙 **Beautiful dark theme** - Easy on the eyes

## 🏋️ The Workout (18 minutes)

### Warm-Up (3 min)
- Leg Swings (Forward/Back) - 30s
- Leg Swings (Lateral) - 30s  
- Hip Openers - 60s
- Torso Twists - 60s

### Rest (20s)

### Circuit (12 min) - No rest between exercises!
| Exercise | Duration | Focus |
|----------|----------|-------|
| Air Squats | 60s | Endurance |
| Wall Sit | 60s | Endurance |
| Forward Lunges | 60s | Strength |
| Cossack Squats | 60s | Lateral |
| Squat Jumps | 60s | Power |
| Wall Sit (Round 2) | 60s | Endurance |
| Plank | 60s | Core |
| Side Plank | 60s | Core |
| Mountain Climbers | 60s | Agility |
| Russian Twists | 60s | Rotation |
| Bird-Dogs | 60s | Stability |
| Lateral Lunges | 60s | Lateral |

### Rest (30s)

### Balance & Recovery (3 min)
- Single-Leg Stand (Left) - 60s
- Single-Leg Stand (Right) - 60s
- Glute Stretch - 60s

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/egmzy/prepare-to-ski.git

# Navigate to the project
cd prepare-to-ski

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📺 TV Setup

For the best experience:
1. Open the app on your TV's browser or cast from your phone/laptop
2. Click "Start Workout"
3. Follow along with the timer and exercise names
4. The beeps will alert you 3 seconds before each exercise ends

## 🛠️ Built With

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - For beep sounds

## 🎨 Customization

### Change the trip date
Edit `src/App.jsx` and update the trip date calculation if needed.

### Modify exercises
Edit `src/workoutData.js` to customize:
- Exercise names and descriptions
- Durations
- Rest periods
- Add or remove exercises

## 📄 License

MIT License - feel free to use this for your own ski prep!

## 🙏 Acknowledgments

- Workout routine designed for ski-specific conditioning
- Inspired by the need to get fit before hitting the slopes!

---

**Ready to hit the slopes? Start your 40-day challenge today! 🏔️**
