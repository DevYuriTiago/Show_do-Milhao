import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { Button } from '../components/Button';
import { QuestionForm } from '../components/QuestionForm';
import { questionService } from '../services/questionService';
import { formatMoney } from '../lib/utils';
import type { Question } from '../types/quiz';

export default function Admin() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const loadedQuestions = await questionService.getQuestions();
      console.log('Loaded questions:', loadedQuestions);
      setQuestions(loadedQuestions);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Erro ao carregar questões');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuestion = async (data: Omit<Question, 'id'>) => {
    try {
      console.log('Creating question with data:', data);
      const newQuestion = await questionService.createQuestion(data);
      if (newQuestion) {
        await loadQuestions();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      setError('Erro ao criar pergunta');
    }
  };

  const handleUpdateQuestion = async (data: Question) => {
    try {
      if (!editingQuestion) return;
      console.log('Updating question with data:', data);
      const updatedQuestion = await questionService.updateQuestion(editingQuestion.id, data);
      if (updatedQuestion) {
        await loadQuestions();
        setEditingQuestion(null);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Erro ao atualizar pergunta');
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      try {
        console.log('Deleting question:', id);
        const success = await questionService.deleteQuestion(id);
        if (success) {
          await loadQuestions();
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Erro ao excluir pergunta');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4">
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Pergunta
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Voltar ao Menu
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-blue-900/90 backdrop-blur-sm rounded-lg p-6 max-w-2xl w-full border border-blue-500/30"
              >
                <h2 className="text-2xl font-bold mb-6">
                  {editingQuestion ? 'Editar Pergunta' : 'Nova Pergunta'}
                </h2>
                <QuestionForm
                  initialData={editingQuestion || undefined}
                  onSubmit={editingQuestion ? handleUpdateQuestion : handleCreateQuestion}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingQuestion(null);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4">
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className={question.correct_answer === 0 ? 'text-green-400 font-bold' : ''}>
                        A: {question.option_a}
                      </p>
                      <p className={question.correct_answer === 1 ? 'text-green-400 font-bold' : ''}>
                        B: {question.option_b}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className={question.correct_answer === 2 ? 'text-green-400 font-bold' : ''}>
                        C: {question.option_c}
                      </p>
                      <p className={question.correct_answer === 3 ? 'text-green-400 font-bold' : ''}>
                        D: {question.option_d}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-300">
                    <p>Resposta Correta: {String.fromCharCode(65 + question.correct_answer)}</p>
                    <p>Valor: {formatMoney(question.value)}</p>
                    <p>Dificuldade: {question.difficulty}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEditingQuestion(question);
                      setIsFormOpen(true);
                    }}
                    className="p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhuma pergunta cadastrada</p>
          </div>
        )}
      </div>
    </div>
  );
}