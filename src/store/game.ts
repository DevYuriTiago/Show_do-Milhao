import { create } from 'zustand';
import { Question } from '../types/quiz';
import { questionService } from '../services/questionService';

interface GameState {
  questions: Question[];
  currentQuestion: number;
  score: number;
  correctAnswers: Question[];
  wrongAnswers: Question[];
  lifelines: {
    audience: boolean;
    cards: boolean;
    skip: boolean;
    university: boolean;
  };
  initializeGame: () => Promise<void>;
  setCurrentQuestion: (index: number) => void;
  addCorrectAnswer: (question: Question) => void;
  addWrongAnswer: (question: Question) => void;
  useLifeline: (lifeline: keyof GameState['lifelines']) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  score: 0,
  correctAnswers: [],
  wrongAnswers: [],
  lifelines: {
    audience: true,
    cards: true,
    skip: true,
    university: true,
  },

  initializeGame: async () => {
    try {
      console.log('Initializing game store...');
      
      // Limpa o estado atual
      set({
        questions: [],
        currentQuestion: 0,
        score: 0,
        correctAnswers: [],
        wrongAnswers: [],
        lifelines: {
          audience: true,
          cards: true,
          skip: true,
          university: true,
        }
      });

      // Busca as questões
      const questions = await questionService.getQuestions();
      console.log('Questions fetched in store:', {
        count: questions.length,
        sample: questions.slice(0, 2)
      });
      
      if (!questions || questions.length === 0) {
        console.error('No questions available in the database');
        throw new Error('Não há perguntas cadastradas no banco de dados.');
      }

      // Embaralha as questões
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      console.log('Questions prepared:', {
        total: shuffledQuestions.length,
        first: shuffledQuestions[0],
        difficulties: [...new Set(shuffledQuestions.map(q => q.difficulty))]
      });

      // Atualiza o estado com as questões embaralhadas
      set(state => ({
        ...state,
        questions: shuffledQuestions
      }));

      // Verifica se o estado foi atualizado corretamente
      const newState = get();
      console.log('Game store state after initialization:', {
        questionCount: newState.questions.length,
        hasQuestions: newState.questions.length > 0,
        firstQuestion: newState.questions[0]
      });
    } catch (error) {
      console.error('Error initializing game store:', error);
      throw error;
    }
  },

  setCurrentQuestion: (index) => {
    set(state => ({ ...state, currentQuestion: index }));
  },

  addCorrectAnswer: (question) => {
    set(state => ({
      ...state,
      score: state.score + question.value,
      correctAnswers: [...state.correctAnswers, question],
    }));
  },

  addWrongAnswer: (question) => {
    set(state => ({
      ...state,
      wrongAnswers: [...state.wrongAnswers, question],
    }));

    // Salva o resultado do jogo
    const state = get();
    questionService.submitGameResult({
      correctAnswers: state.correctAnswers,
      wrongAnswers: [...state.wrongAnswers, question],
      totalScore: state.score,
    }).catch(console.error);
  },

  useLifeline: (lifeline) => {
    set(state => ({
      ...state,
      lifelines: {
        ...state.lifelines,
        [lifeline]: false,
      },
    }));
  },

  resetGame: () => {
    set({
      questions: [],
      currentQuestion: 0,
      score: 0,
      correctAnswers: [],
      wrongAnswers: [],
      lifelines: {
        audience: true,
        cards: true,
        skip: true,
        university: true,
      },
    });
  },
}));