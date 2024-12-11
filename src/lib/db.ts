import Database from 'better-sqlite3';
import { Question } from '../types/quiz';

const db = new Database('quiz.db');

// Inicializa o banco de dados
db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer INTEGER NOT NULL,
    value INTEGER NOT NULL,
    difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')) NOT NULL
  )
`);

export const questionsDb = {
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM questions ORDER BY id DESC');
    return stmt.all() as Question[];
  },

  getById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE id = ?');
    return stmt.get(id) as Question;
  },

  create: (question: Omit<Question, 'id'>) => {
    const stmt = db.prepare(`
      INSERT INTO questions (text, option_a, option_b, option_c, option_d, correct_answer, value, difficulty)
      VALUES (@text, @option_a, @option_b, @option_c, @option_d, @correct_answer, @value, @difficulty)
    `);
    return stmt.run(question);
  },

  update: (id: number, question: Partial<Question>) => {
    const sets = Object.keys(question)
      .map(key => `${key} = @${key}`)
      .join(', ');
    const stmt = db.prepare(`UPDATE questions SET ${sets} WHERE id = @id`);
    return stmt.run({ ...question, id });
  },

  delete: (id: number) => {
    const stmt = db.prepare('DELETE FROM questions WHERE id = ?');
    return stmt.run(id);
  }
};