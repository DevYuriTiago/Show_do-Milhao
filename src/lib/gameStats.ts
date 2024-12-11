interface GameStats {
  grade: number;
  financialBalance: number;
}

export function calculateGameStats(
  correctAnswers: { value: number }[],
  wrongAnswers: { value: number }[],
  totalQuestions: number
): GameStats {
  // Calculate grade (0-10)
  const grade = (correctAnswers.length / totalQuestions) * 10;
  
  // Calculate financial balance
  const correctTotal = correctAnswers.reduce((sum, answer) => sum + answer.value, 0);
  const wrongTotal = wrongAnswers.reduce((sum, answer) => sum + answer.value, 0);
  const financialBalance = correctTotal - wrongTotal;

  return {
    grade: Number(grade.toFixed(1)), // Round to 1 decimal place
    financialBalance
  };
}
