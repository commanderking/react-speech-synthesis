

// Need to mock this for window
const mockSpeechSynthesisUtterance = class SpeechSynthesisUtterance {
};

window.SpeechSynthesisUtterance = mockSpeechSynthesisUtterance;
