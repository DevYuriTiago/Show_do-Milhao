export const calculateGameStats = (
  correctAnswers: { value: number }[],
  wrongAnswers: { value: number }[],
  totalQuestions: number
) => {
  // Calcula a nota de 0 a 10
  const grade = (correctAnswers.length / totalQuestions) * 10;

  // Calcula o saldo financeiro (soma dos acertos menos soma dos erros)
  const correctTotal = correctAnswers.reduce((sum, answer) => sum + answer.value, 0);
  const wrongTotal = wrongAnswers.reduce((sum, answer) => sum + answer.value, 0);
  const financialBalance = correctTotal - wrongTotal;

  return {
    grade: Math.round(grade * 10) / 10, // Arredonda para uma casa decimal
    financialBalance,
  };
};
