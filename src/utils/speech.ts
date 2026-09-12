/**
 * Speech synthesis manager for hands-free step read-aloud
 */

class CookingSpeechManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private speaking = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public getCurrentUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.isSupported()) return;

    // Cancel any active speech first
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    this.speaking = true;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
      (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex')))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.rate = 0.95; // Slightly slower for clear kitchen comprehension
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.speaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.speaking = false;
      this.currentUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    this.speaking = false;
    this.currentUtterance = null;
  }

  public isCurrentlySpeaking(): boolean {
    if (!this.isSupported()) return false;
    return window.speechSynthesis.speaking || this.speaking;
  }
}

export const speechManager = new CookingSpeechManager();
