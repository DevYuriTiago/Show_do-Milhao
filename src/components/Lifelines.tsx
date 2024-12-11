import React from 'react';
import { PhoneCall, Users, SplitSquareHorizontal } from 'lucide-react';
import { Button } from './Button';
import { GameState } from '../store/game';

interface LifelinesProps {
  lifelines: GameState['lifelines'];
  onUseLifeline: (lifeline: keyof GameState['lifelines']) => void;
}

export function Lifelines({ lifelines, onUseLifeline }: LifelinesProps) {
  return (
    <div className="flex gap-4 mb-6">
      <Button
        variant="secondary"
        disabled={!lifelines.fiftyFifty}
        onClick={() => onUseLifeline('fiftyFifty')}
        className="flex items-center gap-2"
      >
        <SplitSquareHorizontal className="w-5 h-5" />
        50:50
      </Button>
      <Button
        variant="secondary"
        disabled={!lifelines.askAudience}
        onClick={() => onUseLifeline('askAudience')}
        className="flex items-center gap-2"
      >
        <Users className="w-5 h-5" />
        Plateia
      </Button>
      <Button
        variant="secondary"
        disabled={!lifelines.phoneAFriend}
        onClick={() => onUseLifeline('phoneAFriend')}
        className="flex items-center gap-2"
      >
        <PhoneCall className="w-5 h-5" />
        Ligar
      </Button>
    </div>
  );
}