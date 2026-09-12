import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { soundEffects } from '../utils/audio';
import { speechManager } from '../utils/speech';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Award, 
  Lightbulb,
  Utensils
} from 'lucide-react';

interface StepByStepCookingModeProps {
  recipe: Recipe;
  onExit: () => void;
}

export const StepByStepCookingMode: React.FC<StepByStepCookingModeProps> = ({
  recipe,
  onExit,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  
  // Timer state
  const currentStep = recipe.steps[currentStepIndex];
  const initialSeconds = currentStep?.timerSeconds || 0;
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  
  // Voice narration state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Finished Recipe Celebration Modal
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Timer reference
  const timerRef = useRef<number | null>(null);

  // Reset timer and stop speech when step changes
  useEffect(() => {
    speechManager.stop();
    setIsSpeaking(false);
    
    const newSeconds = currentStep?.timerSeconds || 0;
    setTimeLeft(newSeconds);
    setIsTimerRunning(false);
    setTimerFinished(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
  }, [currentStepIndex, currentStep]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      speechManager.stop();
    };
  }, []);

  // Timer countdown loop
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            setIsTimerRunning(false);
            setTimerFinished(true);
            soundEffects.playTimerAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isTimerRunning && timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStepIndex < recipe.steps.length - 1) {
        handleNextStep();
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        handlePrevStep();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, recipe.steps.length]);

  const toggleTimer = () => {
    if (timeLeft === 0 && initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      setTimerFinished(false);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(initialSeconds);
    setTimerFinished(false);
  };

  const adjustTimer = (secondsDelta: number) => {
    setTimeLeft(prev => Math.max(0, prev + secondsDelta));
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const fullText = `Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}. ${currentStep.tip ? `Chef tip: ${currentStep.tip}` : ''}`;
      speechManager.speak(fullText, () => {
        setIsSpeaking(false);
      });
    }
  };

  const markStepDone = () => {
    soundEffects.playStepDone();
    setCompletedSteps(prev => ({ ...prev, [currentStepIndex]: true }));
    if (currentStepIndex < recipe.steps.length - 1) {
      handleNextStep();
    } else {
      triggerCelebration();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    soundEffects.playCelebration();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // Confetti fallback
    }
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / recipe.steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917] text-white flex flex-col select-none overflow-hidden animate-in fade-in">
      
      {/* Top Bar Header */}
      <header className="px-6 py-4 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400">Cook Mode</span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-400">{recipe.cuisine}</span>
            </div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-white truncate max-w-md">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Read Aloud Button */}
          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isSpeaking
                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400 animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
            }`}
            title="Read instructions aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop Narration' : 'Read Aloud'}</span>
          </button>

          {/* Exit Button */}
          <button
            onClick={onExit}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
            title="Exit Cook Mode"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-stone-800 h-1.5 shrink-0">
        <div 
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Cooking Workspace */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex flex-col justify-between max-w-5xl mx-auto w-full">
        
        <div className="space-y-6 sm:space-y-8 my-auto">
          
          {/* Step Tag */}
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Step {currentStep.stepNumber} of {recipe.steps.length}
            </span>
            <span className="text-xs sm:text-sm font-bold text-stone-400">
              {progressPercent}% Completed
            </span>
          </div>

          {/* Step Title */}
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight">
            {currentStep.title}
          </h2>

          {/* Step Instruction (Extra Large Typography) */}
          <p className="text-base sm:text-xl md:text-2xl text-stone-200 font-light leading-relaxed">
            {currentStep.instruction}
          </p>

          {/* Step Ingredients Highlight */}
          {currentStep.ingredientsUsed && currentStep.ingredientsUsed.length > 0 && (
            <div className="bg-stone-900/80 rounded-2xl p-4 sm:p-5 border border-stone-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Ingredients for this step:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentStep.ingredientsUsed.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200 text-xs sm:text-sm font-medium border border-stone-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chef's Pro Tip */}
          {currentStep.tip && (
            <div className="flex items-start gap-3 bg-amber-950/40 border border-amber-600/30 p-4 sm:p-5 rounded-2xl">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                <strong className="text-amber-400">Chef's Secret:</strong> {currentStep.tip}
              </div>
            </div>
          )}

          {/* Interactive Kitchen Timer Widget */}
          {(currentStep.timerSeconds || initialSeconds > 0 || timeLeft > 0) && (
            <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${
              timerFinished
                ? 'bg-rose-950/40 border-rose-500 animate-bounce'
                : isTimerRunning
                ? 'bg-stone-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                : 'bg-stone-900/90 border-stone-800'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    timerFinished ? 'bg-rose-500 text-white' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    <Clock className={`w-6 h-6 ${isTimerRunning ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
                      Step Timer {timerFinished && '— TIME IS UP!'}
                    </span>
                    <div className={`font-mono font-black text-3xl sm:text-4xl tracking-tight ${
                      timerFinished ? 'text-rose-400' : 'text-white'
                    }`}>
                      {formatTimer(timeLeft)}
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => adjustTimer(-60)}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all"
                    title="-1 Minute"
                  >
                    -1m
                  </button>
                  <button
                    onClick={() => adjustTimer(60)}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all"
                    title="+1 Minute"
                  >
                    +1m
                  </button>

                  <button
                    onClick={toggleTimer}
                    className={`px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                      isTimerRunning
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isTimerRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}</span>
                  </button>

                  <button
                    onClick={resetTimer}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-all"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* Bottom Sticky Navigation */}
      <footer className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex items-center justify-between gap-4 shrink-0">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none text-stone-200 font-bold text-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs">
          {recipe.steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-8 bg-amber-500'
                  : completedSteps[idx]
                  ? 'w-2.5 bg-emerald-500'
                  : 'w-2.5 bg-stone-700 hover:bg-stone-600'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={markStepDone}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{currentStepIndex === recipe.steps.length - 1 ? 'Finish Cooking!' : 'Step Done & Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="bg-stone-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto text-stone-950 shadow-xl shadow-amber-500/30 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Bon Appétit! 🍽️
              </h3>
              <p className="text-sm text-stone-300">
                You've successfully created <span className="text-amber-400 font-semibold">{recipe.title}</span>!
              </p>
            </div>

            <div className="bg-stone-800/80 rounded-2xl p-4 text-xs text-stone-300 space-y-1.5 border border-stone-700">
              <div className="flex justify-between">
                <span>Total Steps Completed:</span>
                <span className="font-bold text-emerald-400">{recipe.steps.length} of {recipe.steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Cooking Time:</span>
                <span className="font-bold text-white">{recipe.cookTimeMinutes} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Servings:</span>
                <span className="font-bold text-white">{recipe.baseServings} portions</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setShowCelebration(false);
                  onExit();
                }}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Return to Recipes</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
