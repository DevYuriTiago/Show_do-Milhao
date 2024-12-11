import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    correctAnswer: 2,
    value: 1000,
    difficulty: 'easy',
  },
  {
    id: 2,
    text: 'Quem pintou a Mona Lisa?',
    options: [
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Pablo Picasso',
      'Michelangelo',
    ],
    correctAnswer: 1,
    value: 5000,
    difficulty: 'easy',
  },
  // Adicione mais perguntas aqui
];