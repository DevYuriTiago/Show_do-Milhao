import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, HelpCircle, LogIn } from 'lucide-react';
import { Button } from '../components/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/sparkles.gif')] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Trophy className="h-24 w-24 mb-8 text-yellow-400 animate-glow" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 animate-glow"
          >
            Show do Milhão
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 max-w-2xl"
          >
            Teste seus conhecimentos e concorra a prêmios incríveis neste
            emocionante jogo de perguntas e respostas!
          </motion.p>

          <Button
            size="lg"
            className="mb-8 w-64 bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(0,0,255,0.5)] hover:shadow-[0_0_50px_rgba(0,0,255,0.8)] transition-all duration-300"
            onClick={() => navigate('/game')}
          >
            <Trophy className="w-6 h-6 mr-2" />
            Jogar Agora
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-900/20 p-6 rounded-lg backdrop-blur-sm border border-blue-500 shadow-[0_0_30px_rgba(0,0,255,0.3)]"
            >
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-semibold mb-4 animate-glow">Como Jogar</h2>
              <ul className="text-left space-y-2">
                <li>• Responda corretamente às perguntas</li>
                <li>• Use suas ajudas sabiamente</li>
                <li>• Acumule pontos e ganhe prêmios</li>
                <li>• Compete com outros jogadores</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm border border-purple-500 shadow-[0_0_30px_rgba(128,0,255,0.3)]"
            >
              <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-2xl font-semibold mb-4 animate-glow">Prêmios</h2>
              <ul className="text-left space-y-2">
                <li>• 1ª Pergunta: R$ 1.000</li>
                <li>• 5ª Pergunta: R$ 10.000</li>
                <li>• 10ª Pergunta: R$ 100.000</li>
                <li>• 15ª Pergunta: R$ 1.000.000</li>
              </ul>
            </motion.div>
          </div>

          <Button
            variant="outline"
            className="mt-12 border-purple-500 text-white shadow-[0_0_15px_rgba(128,0,255,0.3)] hover:shadow-[0_0_30px_rgba(128,0,255,0.5)]"
            onClick={() => navigate('/admin')}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Área Administrativa
          </Button>
        </div>
      </div>
    </div>
  );
}