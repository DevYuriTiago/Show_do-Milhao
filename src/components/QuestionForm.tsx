import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './Button';
import type { Question } from '../types/quiz';

const questionSchema = z.object({
  text: z.string().min(1, 'A pergunta é obrigatória'),
  option_a: z.string().min(1, 'A alternativa A é obrigatória'),
  option_b: z.string().min(1, 'A alternativa B é obrigatória'),
  option_c: z.string().min(1, 'A alternativa C é obrigatória'),
  option_d: z.string().min(1, 'A alternativa D é obrigatória'),
  correct_answer: z.number().min(0).max(3),
  value: z.number().min(1000),
  difficulty: z.enum(['easy', 'medium', 'hard'])
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  initialData?: Question;
  onSubmit: (data: Question) => Promise<void>;
  onCancel: () => void;
}

export function QuestionForm({ initialData, onSubmit, onCancel }: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      value: 1000,
      difficulty: 'easy',
      correct_answer: 0
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Pergunta
        </label>
        <textarea
          {...register('text')}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Alternativa A
          </label>
          <input
            type="text"
            {...register('option_a')}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.option_a && (
            <p className="mt-1 text-sm text-red-500">{errors.option_a.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">
            Alternativa B
          </label>
          <input
            type="text"
            {...register('option_b')}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.option_b && (
            <p className="mt-1 text-sm text-red-500">{errors.option_b.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">
            Alternativa C
          </label>
          <input
            type="text"
            {...register('option_c')}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.option_c && (
            <p className="mt-1 text-sm text-red-500">{errors.option_c.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">
            Alternativa D
          </label>
          <input
            type="text"
            {...register('option_d')}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.option_d && (
            <p className="mt-1 text-sm text-red-500">{errors.option_d.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Resposta Correta
          </label>
          <select
            {...register('correct_answer', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>A</option>
            <option value={1}>B</option>
            <option value={2}>C</option>
            <option value={3}>D</option>
          </select>
          {errors.correct_answer && (
            <p className="mt-1 text-sm text-red-500">{errors.correct_answer.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">
            Valor
          </label>
          <input
            type="number"
            {...register('value', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min={1000}
            step={1000}
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-500">{errors.value.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">
            Dificuldade
          </label>
          <select
            {...register('difficulty')}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="easy">Fácil</option>
            <option value="medium">Média</option>
            <option value="hard">Difícil</option>
          </select>
          {errors.difficulty && (
            <p className="mt-1 text-sm text-red-500">{errors.difficulty.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? 'Atualizar' : 'Criar'} Pergunta
        </Button>
      </div>
    </form>
  );
}