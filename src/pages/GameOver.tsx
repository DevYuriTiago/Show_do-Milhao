import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useGameStore } from '../store/game';
import { formatMoney } from '../lib/utils';

export default function GameOver() {
  const navigate = useNavigate();
  const { score, correctAnswers, wrongAnswers, questions } = useGameStore();

  const totalQuestions = questions.length;
  const percentageCorrect = (correctAnswers.length / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-12"
        >
          <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-2">Fim de Jogo!</h1>
          <p className="text-2xl text-blue-300">
            Você ganhou {formatMoney(score)}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Estatísticas */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-blue-900/30 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-300">Total de Perguntas</p>
                <p className="text-2xl font-bold">{totalQuestions}</p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Respostas Corretas</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-2xl font-bold">{correctAnswers.length}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-300">Respostas Incorretas</p>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <p className="text-2xl font-bold">{wrongAnswers.length}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-300">Taxa de Acerto</p>
                <p className="text-2xl font-bold">{percentageCorrect.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>

          {/* Resumo das Perguntas */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-blue-900/30 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Resumo das Perguntas</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {questions.map((question, index) => {
                const wasCorrect = correctAnswers.some(q => q.id === question.id);
                const wasWrong = wrongAnswers.some(q => q.id === question.id);
                const answerStatus = wasCorrect ? 'correct' : wasWrong ? 'wrong' : 'unanswered';

                return (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg ${
                      answerStatus === 'correct'
                        ? 'bg-green-900/20 border border-green-500/30'
                        : answerStatus === 'wrong'
                        ? 'bg-red-900/20 border border-red-500/30'
                        : 'bg-gray-900/20 border border-gray-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-gray-400">#{index + 1}</span>
                      <div>
                        <p className="text-sm">{question.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {answerStatus === 'correct' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : answerStatus === 'wrong' ? (
                            <XCircle className="w-4 h-4 text-red-500" />
                          ) : null}
                          <p className="text-xs text-gray-400">
                            {formatMoney(question.value)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center gap-4"
        >
          <Button onClick={() => navigate('/')}>Voltar ao Menu</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Jogar Novamente
          </Button>
        </motion.div>
      </div>
    </div>
  );
}