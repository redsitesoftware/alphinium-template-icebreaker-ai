/**
 * AppNavigator — renders the correct screen based on game phase in Zustand store.
 * No stack navigator needed — game flow is linear and state-driven.
 */
import React from 'react';
import { useGameStore } from '../store/gameStore';

import HomeScreen from '../screens/HomeScreen';
import LobbyScreen from '../screens/LobbyScreen';
import PromptScreen from '../screens/PromptScreen';
import AnswerScreen from '../screens/AnswerScreen';
import ResultsScreen from '../screens/ResultsScreen';
import FinishedScreen from '../screens/FinishedScreen';

export default function AppNavigator() {
  const phase = useGameStore(s => s.phase);

  switch (phase) {
    case 'lobby':     return <LobbyScreen />;
    case 'prompt':    return <PromptScreen />;
    case 'answering': return <AnswerScreen />;
    case 'results':   return <ResultsScreen />;
    case 'finished':  return <FinishedScreen />;
    default:          return <HomeScreen />;
  }
}
