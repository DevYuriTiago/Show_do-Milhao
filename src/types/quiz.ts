export interface Question {
  id: number;
  text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
  value: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}