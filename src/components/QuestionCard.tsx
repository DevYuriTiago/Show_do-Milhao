import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/quiz';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
  isLocked: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isLocked,
}: QuestionCardProps) {
  const options = [
    { key: 'option_a', value: question.option_a },
    { key: 'option_b', value: question.option_b },
    { key: 'option_c', value: question.option_c },
    { key: 'option_d', value: question.option_d },
  ];

  return (
    <div className="w-full max-w-3xl bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 text-white border border-blue-500 shadow-[0_0_30px_rgba(0,0,255,0.3)]">
      <h3 className="text-2xl font-bold mb-6">{question.text}</h3>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === letter;
          const isCorrect = isLocked && index === question.correct_answer;
          const isWrong = isLocked && isSelected && index !== question.correct_answer;

          return (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={cn(
                  'text-left p-4 h-auto w-full transition-all',
                  'border-blue-500 hover:border-blue-400',
                  !isLocked && 'hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]',
                  isSelected && !isLocked && 'bg-blue-500 text-white border-blue-500',
                  isCorrect && 'bg-green-500 text-white border-green-500',
                  isWrong && 'bg-red-500 text-white border-red-500',
                  isLocked && 'cursor-not-allowed'
                )}
                onClick={() => !isLocked && onSelectAnswer(letter)}
                disabled={isLocked}
              >
                <span className="font-bold mr-2 text-blue-400">
                  {letter}:
                </span>
                {option.value}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}