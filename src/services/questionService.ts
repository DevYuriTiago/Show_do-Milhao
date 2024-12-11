import { supabase } from '../lib/supabase';
import type { Question } from '../types/quiz';

const API_URL = 'http://localhost:3000'; // Ajuste para a URL do seu backend

export type { Question };

export const questionService = {
  async getQuestions(): Promise<Question[]> {
    try {
      console.log('Fetching questions from Supabase...');
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('difficulty', { ascending: true })
        .order('value', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No questions found in the database');
      } else {
        console.log('Questions fetched:', data);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error; // Propaga o erro em vez de retornar array vazio
    }
  },

  async getQuestionById(id: number): Promise<Question | null> {
    try {
      console.log('Fetching question by id:', id);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Question fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error; // Propaga o erro em vez de retornar null
    }
  },

  async createQuestion(question: Omit<Question, 'id'>): Promise<Question | null> {
    try {
      console.log('Creating question:', question);
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          text: question.text,
          option_a: question.option_a,
          option_b: question.option_b,
          option_c: question.option_c,
          option_d: question.option_d,
          correct_answer: question.correct_answer,
          value: question.value,
          difficulty: question.difficulty
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Question created:', data);
      return data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error; // Propaga o erro em vez de retornar null
    }
  },

  async updateQuestion(id: number, question: Partial<Question>): Promise<Question | null> {
    try {
      console.log('Updating question:', id, question);
      const { data, error } = await supabase
        .from('questions')
        .update(question)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Question updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating question:', error);
      throw error; // Propaga o erro em vez de retornar null
    }
  },

  async deleteQuestion(id: number): Promise<boolean> {
    try {
      console.log('Deleting question:', id);
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Question deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error; // Propaga o erro em vez de retornar false
    }
  },

  async getQuestionsByDifficulty(difficulty: string): Promise<Question[]> {
    try {
      console.log('Fetching questions by difficulty:', difficulty);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('difficulty', difficulty)
        .order('value', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Questions fetched:', data);
      return data || [];
    } catch (error) {
      console.error('Error fetching questions by difficulty:', error);
      throw error; // Propaga o erro em vez de retornar array vazio
    }
  },

  async submitGameResult(result: {
    correctAnswers: { value: number }[];
    wrongAnswers: { value: number }[];
    totalScore: number;
  }): Promise<void> {
    try {
      console.log('Submitting game result:', result);
      const { error } = await supabase
        .from('game_results')
        .insert([result]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Game result submitted successfully');
    } catch (error) {
      console.error('Error submitting game result:', error);
      throw error;
    }
  }
};
