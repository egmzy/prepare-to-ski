// Workout data for 40-day ski prep routine
export const workoutData = {
  getReady: {
    name: "Get Ready!",
    duration: 10,
    phase: "prep",
    note: "Find your space and prepare to begin"
  },

  warmUp: [
    {
      name: "Leg Swings (Forward/Back)",
      duration: 30,
      phase: "warm-up",
      note: "30 seconds per leg - forward and back"
    },
    {
      name: "Leg Swings (Lateral)",
      duration: 30,
      phase: "warm-up",
      note: "30 seconds per leg - side to side"
    },
    {
      name: "Hip Openers",
      duration: 60,
      phase: "warm-up",
      note: "Open up those hips for better mobility"
    },
    {
      name: "Torso Twists",
      duration: 60,
      phase: "warm-up",
      note: "Rotate your upper body, keep hips stable"
    }
  ],

  rest1: {
    name: "Rest & Breathe",
    duration: 20,
    phase: "rest",
    note: "Get ready for the main circuit!"
  },

  circuit: [
    {
      name: "Air Squats",
      duration: 45,
      phase: "circuit",
      focus: "Endurance",
      note: "Keep chest up; weight on heels"
    },
    {
      name: "Wall Sit",
      duration: 45,
      phase: "circuit",
      focus: "Endurance",
      note: "90° angle at knees; back flat against wall"
    },
    {
      name: "Forward Lunges",
      duration: 45,
      phase: "circuit",
      focus: "Strength",
      note: "Alternating legs; avoid knee-over-toe"
    },
    {
      name: "Cossack Squats",
      duration: 45,
      phase: "circuit",
      focus: "Lateral",
      note: "Deep side-to-side stretch/squat"
    },
    {
      name: "Squat Jumps",
      duration: 45,
      phase: "circuit",
      focus: "Power",
      note: "Land softly to protect joints"
    },
    {
      name: "Wall Sit (Round 2)",
      duration: 45,
      phase: "circuit",
      focus: "Endurance",
      note: "Embrace the burn; keep hands off thighs!"
    },
    {
      name: "Plank",
      duration: 45,
      phase: "circuit",
      focus: "Core",
      note: "Tighten glutes; no sagging hips"
    },
    {
      name: "Side Plank",
      duration: 45,
      phase: "circuit",
      focus: "Core",
      note: "30s per side; keep hips high"
    },
    {
      name: "Mountain Climbers",
      duration: 45,
      phase: "circuit",
      focus: "Agility",
      note: "Fast tempo; keep shoulders over wrists"
    },
    {
      name: "Russian Twists",
      duration: 45,
      phase: "circuit",
      focus: "Rotation",
      note: "Feet elevated; touch floor each side"
    },
    {
      name: "Bird-Dogs",
      duration: 45,
      phase: "circuit",
      focus: "Stability",
      note: "Slow movement; avoid arching back"
    },
    {
      name: "Lateral Lunges",
      duration: 45,
      phase: "circuit",
      focus: "Lateral",
      note: "Mimics weight transfer on skis"
    }
  ],

  rest2: {
    name: "Rest & Breathe",
    duration: 30,
    phase: "rest",
    note: "Great work! Balance & Recovery coming up"
  },

  recovery: [
    {
      name: "Single-Leg Stand (Left)",
      duration: 60,
      phase: "recovery",
      note: "Close eyes to simulate 'flat light' visibility"
    },
    {
      name: "Single-Leg Stand (Right)",
      duration: 60,
      phase: "recovery",
      note: "Close eyes to simulate 'flat light' visibility"
    },
    {
      name: "Glute Stretch",
      duration: 60,
      phase: "recovery",
      note: "30 seconds per side - breathe deeply"
    }
  ],

  complete: {
    name: "Workout Complete! 🎿",
    duration: 0,
    phase: "complete",
    note: "Great job! You're one day closer to the slopes!"
  }
};

// Build the full workout sequence
export function getWorkoutSequence() {
  // Create circuit with prep phases between each exercise
  const circuitWithPrep = [];
  workoutData.circuit.forEach((exercise, index) => {
    // Add 10-second prep before each circuit exercise
    circuitWithPrep.push({
      name: `Get Ready: ${exercise.name}`,
      duration: 10,
      phase: "prep",
      note: `Coming up next: ${exercise.name}`
    });
    circuitWithPrep.push(exercise);
  });

  return [
    workoutData.getReady,
    ...workoutData.warmUp,
    workoutData.rest1,
    ...circuitWithPrep,
    workoutData.rest2,
    ...workoutData.recovery,
    workoutData.complete
  ];
}

// Calculate total workout time
export function getTotalWorkoutTime() {
  const sequence = getWorkoutSequence();
  return sequence.reduce((total, exercise) => total + exercise.duration, 0);
}
