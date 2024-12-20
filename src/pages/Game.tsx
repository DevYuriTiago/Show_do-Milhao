import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle } from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';
import { Button } from '../components/Button';
import { useGameStore } from '../store/game';
import { formatMoney } from '../lib/utils';

const GAME_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const SELECTION_SOUND_URL = 'https://www.soundjay.com/mechanical/sounds/laser-gun-19.mp3';

export default function Game() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [audio] = useState(new Audio(GAME_MUSIC_URL));
  const [selectionSound] = useState(new Audio(SELECTION_SOUND_URL));

  const {
    currentQuestion,
    questions,
    setCurrentQuestion,
    score,
    lifelines,
    useLifeline,
    addCorrectAnswer,
    addWrongAnswer,
    initializeGame,
  } = useGameStore();

  // Efeito para controlar a música do jogo
  useEffect(() => {
    // Configura o volume e loop
    audio.volume = 0.5;
    audio.loop = true;

    // Configura o volume do som de seleção
    selectionSound.volume = 0.3;

    // Inicia a música
    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error('Error playing music:', error);
      }
    };
    playMusic();

    // Cleanup: para a música quando o componente for desmontado
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerLocked) {
      setSelectedAnswer(answer);
      // Toca o som de seleção
      selectionSound.currentTime = 0; // Reseta o som para poder tocar várias vezes
      selectionSound.play().catch(console.error);
    }
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !questions[currentQuestion]) return;

    setIsAnswerLocked(true);
    
    // Converte a letra selecionada (A, B, C, D) para índice (0, 1, 2, 3)
    const selectedIndex = selectedAnswer.charCodeAt(0) - 65;
    const isCorrect = selectedIndex === questions[currentQuestion].correct_answer;

    setTimeout(() => {
      if (isCorrect) {
        addCorrectAnswer(questions[currentQuestion]);
      } else {
        addWrongAnswer(questions[currentQuestion]);
      }

      // Sempre avança para a próxima pergunta, independente de acertar ou errar
      if (currentQuestion === questions.length - 1) {
        // Se for a última pergunta, vai para a tela de resultados
        navigate('/game-over');
      } else {
        // Se não for a última, avança para a próxima
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(undefined);
        setIsAnswerLocked(false);
      }
    }, 2000);
  };

  useEffect(() => {
    const loadGame = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting game initialization...');

        // Inicializa o jogo (isso irá buscar as questões internamente)
        await initializeGame();
        
        // Verifica se as questões foram carregadas
        const currentState = useGameStore.getState();
        console.log('Game state after initialization:', {
          hasQuestions: currentState.questions.length > 0,
          questionCount: currentState.questions.length,
          currentQuestion: currentState.currentQuestion,
          score: currentState.score
        });
        
        if (!currentState.questions || currentState.questions.length === 0) {
          throw new Error('Não foi possível carregar as perguntas. Por favor, verifique se há perguntas cadastradas no banco de dados.');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading game:', error);
        setError(error instanceof Error ? error.message : 'Erro ao iniciar o jogo');
        setIsLoading(false);
      }
    };

    loadGame();

    // Cleanup function
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Log do estado atual do jogo sempre que mudar
  useEffect(() => {
    console.log('Current game state:', {
      currentQuestion,
      totalQuestions: questions.length,
      score,
      hasCurrentQuestion: !!questions[currentQuestion],
      currentQuestionData: questions[currentQuestion]
    });
  }, [currentQuestion, questions, score]);

  const currentQuestionData = questions[currentQuestion];
  console.log('Current question data:', currentQuestionData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 animate-bounce text-yellow-400" />
          <p className="text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/')}>Voltar ao Menu</Button>
            <Button onClick={() => navigate('/admin')} variant="outline">
              Ir para o Painel Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <p className="text-xl mb-4">Não há perguntas disponíveis para o jogo.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/')}>Voltar ao Menu</Button>
            <Button onClick={() => navigate('/admin')} variant="outline">
              Ir para o Painel Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-blue-300">Pergunta {currentQuestion + 1} de {questions.length}</p>
            <p className="text-2xl font-bold">Prêmio: {formatMoney(currentQuestionData.value)}</p>
          </div>
          <div>
            <p className="text-sm text-blue-300">Pontuação Atual</p>
            <p className="text-2xl font-bold">{formatMoney(score)}</p>
          </div>
        </div>

        

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionCard
              question={currentQuestionData}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleAnswerSelect}
              isLocked={isAnswerLocked}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleConfirmAnswer}
            disabled={!selectedAnswer || isAnswerLocked}
            className="w-48"
          >
            Confirmar Resposta
          </Button>
        </div>
      </div>
    </div>
  );
}