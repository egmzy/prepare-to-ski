import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { getWorkoutSequence, getTotalWorkoutTime } from './workoutData';
import './App.css';

// Audio context for beep sounds
let audioContext = null;

function playBeep(frequency = 880, duration = 0.15, volume = 0.3) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Get phase color - defined outside component
const getPhaseColor = (phase) => {
  const colors = {
    'prep': '#3b82f6',
    'warm-up': '#f59e0b',
    'rest': '#22c55e',
    'circuit': '#ef4444',
    'recovery': '#a855f7',
    'complete': '#22c55e'
  };
  return colors[phase] || '#3b82f6';
};

// Get short phase label - defined outside component
const getShortPhase = (phase) => {
  const labels = {
    'prep': 'PREP',
    'warm-up': 'WARM',
    'rest': 'REST',
    'circuit': 'CIRCUIT',
    'recovery': 'RECOVERY',
    'complete': 'DONE'
  };
  return labels[phase] || phase.toUpperCase();
};

// Timeline component - defined OUTSIDE App to prevent re-creation on every render
const Timeline = memo(function Timeline({ 
  workoutSequence, 
  currentIndex, 
  workoutState, 
  onJumpToExercise,
  onGoToStart,
  showHeader = true 
}) {
  return (
    <div className="timeline-sidebar">
      {showHeader && (
        <div className="timeline-header">
          <span className="timeline-title">Timeline</span>
          <span className="timeline-progress">
            {workoutState === 'idle' ? `${workoutSequence.length} exercises` : `${currentIndex + 1}/${workoutSequence.length}`}
          </span>
        </div>
      )}
      <div className="timeline-list">
        {/* Step 0 - Back to start */}
        {workoutState !== 'idle' && (
          <button
            className="timeline-item timeline-home"
            onClick={onGoToStart}
            style={{ '--phase-color': '#64748b' }}
          >
            <div className="timeline-marker">⌂</div>
            <div className="timeline-content">
              <span className="timeline-phase">HOME</span>
              <span className="timeline-name">Back to Start</span>
            </div>
          </button>
        )}
        {workoutSequence.map((exercise, index) => (
          <button
            key={index}
            className={`timeline-item ${index === currentIndex && workoutState !== 'idle' ? 'active' : ''} ${index < currentIndex && workoutState !== 'idle' ? 'completed' : ''}`}
            onClick={() => onJumpToExercise(index)}
            style={{ '--phase-color': getPhaseColor(exercise.phase) }}
          >
            <div className="timeline-marker">
              {index < currentIndex && workoutState !== 'idle' ? '✓' : index + 1}
            </div>
            <div className="timeline-content">
              <span className="timeline-phase">{getShortPhase(exercise.phase)}</span>
              <span className="timeline-name">{exercise.name}</span>
              <span className="timeline-duration">{exercise.duration}s</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

function App() {
  const [workoutState, setWorkoutState] = useState('idle'); // idle, running, paused, complete
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lastBeepRef = useRef(null);
  
  const workoutSequence = getWorkoutSequence();
  const totalWorkoutTime = getTotalWorkoutTime();
  const currentExercise = workoutSequence[currentIndex];

  // Fullscreen handlers
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const startWorkout = useCallback(() => {
    // Initialize audio context on user interaction
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    setWorkoutState('running');
    setCurrentIndex(0);
    setTimeRemaining(workoutSequence[0].duration);
    setTotalElapsed(0);
    lastBeepRef.current = null;
  }, [workoutSequence]);

  const jumpToExercise = useCallback((index) => {
    // Initialize audio context on user interaction
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    setCurrentIndex(index);
    setTimeRemaining(workoutSequence[index].duration);
    lastBeepRef.current = null;
    if (workoutState === 'idle') {
      setWorkoutState('running');
      setTotalElapsed(0);
    }
  }, [workoutSequence, workoutState]);

  const togglePause = useCallback(() => {
    setWorkoutState(prev => prev === 'running' ? 'paused' : 'running');
  }, []);

  const resetWorkout = useCallback(() => {
    setWorkoutState('idle');
    setCurrentIndex(0);
    setTimeRemaining(0);
    setTotalElapsed(0);
    lastBeepRef.current = null;
  }, []);

  // Timer effect
  useEffect(() => {
    if (workoutState !== 'running') return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        // Play beeps at 3, 2, 1 seconds remaining
        if (prev <= 3 && prev > 0 && lastBeepRef.current !== prev) {
          lastBeepRef.current = prev;
          // Different tones for countdown
          const frequencies = { 3: 660, 2: 770, 1: 880 };
          playBeep(frequencies[prev] || 880, 0.12, 0.25);
        }
        
        if (prev <= 1) {
          // Move to next exercise
          const nextIndex = currentIndex + 1;
          
          if (nextIndex >= workoutSequence.length) {
            setWorkoutState('complete');
            return 0;
          }
          
          setCurrentIndex(nextIndex);
          lastBeepRef.current = null;
          
          // Play a different tone for exercise start
          setTimeout(() => playBeep(1046, 0.2, 0.3), 50);
          
          return workoutSequence[nextIndex].duration;
        }
        
        return prev - 1;
      });
      
      setTotalElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutState, currentIndex, workoutSequence]);

  // Idle state - Start screen
  if (workoutState === 'idle') {
    return (
      <div className="app">
        <button 
          className="fullscreen-btn" 
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
        <div className="main-layout">
          <div className="start-screen">
            <div className="logo">
              <span className="logo-icon">⛷️</span>
              <h1>Prepare to Ski</h1>
            </div>
            
            <div className="workout-info">
              <div className="info-card">
                <span className="info-icon">⏱️</span>
                <span className="info-text">18 minutes</span>
              </div>
              <div className="info-card">
                <span className="info-icon">💪</span>
                <span className="info-text">{workoutSequence.length - 2} exercises</span>
              </div>
              <div className="info-card">
                <span className="info-icon">🔥</span>
                <span className="info-text">Full body</span>
              </div>
            </div>
            
            <button className="start-button" onClick={startWorkout}>
              <span className="button-icon">▶</span>
              Start Workout
            </button>
            
            <p className="tip">Turn on your TV and follow along!</p>
          </div>
          
          <Timeline 
            workoutSequence={workoutSequence}
            currentIndex={currentIndex}
            workoutState={workoutState}
            onJumpToExercise={jumpToExercise}
            onGoToStart={resetWorkout}
          />
        </div>
      </div>
    );
  }

  // Complete state
  if (workoutState === 'complete') {
    return (
      <div className="app">
        <button 
          className="fullscreen-btn" 
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
        <div className="main-layout">
          <div className="complete-screen">
            <div className="complete-icon">🏔️</div>
            <h1>Workout Complete!</h1>
            <p className="complete-message">
              Amazing work! You're one day closer to conquering the slopes!
            </p>
            
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{formatTime(totalElapsed)}</span>
                <span className="stat-label">Total Time</span>
              </div>
            </div>
            
            <button className="start-button" onClick={resetWorkout}>
              <span className="button-icon">🔄</span>
              Back to Start
            </button>
          </div>
          
          <Timeline 
            workoutSequence={workoutSequence}
            currentIndex={currentIndex}
            workoutState={workoutState}
            onJumpToExercise={jumpToExercise}
            onGoToStart={resetWorkout}
          />
        </div>
      </div>
    );
  }

  // Active workout state
  const timeProgress = ((currentExercise.duration - timeRemaining) / currentExercise.duration) * 100;

  return (
    <div className="app workout-active">
      <button 
        className="fullscreen-btn" 
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? '⛶' : '⛶'}
      </button>
      {/* Main content area */}
      <div className="main-layout">
        {/* Main workout display */}
        <div className="workout-main">
          <div className="phase-badge" style={{ '--phase-color': getPhaseColor(currentExercise.phase) }}>
            {currentExercise.phase.toUpperCase()}
            {currentExercise.focus && <span className="focus-tag"> • {currentExercise.focus}</span>}
          </div>
          
          <h1 className="exercise-name">{currentExercise.name}</h1>
          
          <p className="exercise-note">{currentExercise.note}</p>
          
          {/* Timer display - clickable to pause */}
          <div className="timer-container" onClick={togglePause} title="Click to pause/resume">
            <div className={`timer-ring ${workoutState === 'paused' ? 'paused' : ''}`}>
              <svg viewBox="0 0 100 100">
                <circle 
                  className="timer-bg" 
                  cx="50" cy="50" r="45"
                />
                <circle 
                  className="timer-progress" 
                  cx="50" cy="50" r="45"
                  style={{ 
                    strokeDasharray: `${(timeProgress / 100) * 283} 283`,
                    stroke: getPhaseColor(currentExercise.phase)
                  }}
                />
              </svg>
              <div className="timer-display">
                {workoutState === 'paused' ? (
                  <>
                    <span className="timer-paused-icon">▶</span>
                    <span className="timer-label">PAUSED</span>
                  </>
                ) : (
                  <>
                    <span className={`timer-seconds ${timeRemaining <= 3 ? 'warning' : ''}`}>
                      {timeRemaining}
                    </span>
                    <span className="timer-label">seconds</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Next exercise preview */}
          {currentIndex < workoutSequence.length - 1 && (
            <div className="next-preview">
              <span className="next-label">NEXT:</span>
              <span className="next-name">{workoutSequence[currentIndex + 1].name}</span>
            </div>
          )}
        </div>
        
        {/* Timeline sidebar */}
        <Timeline 
          workoutSequence={workoutSequence}
          currentIndex={currentIndex}
          workoutState={workoutState}
          onJumpToExercise={jumpToExercise}
          onGoToStart={resetWorkout}
        />
      </div>
    </div>
  );
}

export default App;
