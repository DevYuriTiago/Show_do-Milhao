import { Question } from '../types/quiz';

const STORAGE_KEY = 'quiz_questions';

export const storage = {
  getQuestions: (): Question[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveQuestions: (questions: Question[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  },

  addQuestion: (question: Omit<Question, 'id'>) => {
    const questions = storage.getQuestions();
    const newQuestion = {
      ...question,
      id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
    };
    questions.push(newQuestion);
    storage.saveQuestions(questions);
    return newQuestion;
  },

  updateQuestion: (id: number, question: Partial<Question>) => {
    const questions = storage.getQuestions();
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
      questions[index] = { ...questions[index], ...question };
      storage.saveQuestions(questions);
      return questions[index];
    }
    return null;
  },

  deleteQuestion: (id: number) => {
    const questions = storage.getQuestions();
    const newQuestions = questions.filter(q => q.id !== id);
    storage.saveQuestions(newQuestions);
  }
};