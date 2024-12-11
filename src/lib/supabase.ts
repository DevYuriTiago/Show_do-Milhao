import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Configurado' : 'Não configurado');
console.log('Supabase Key:', supabaseAnonKey ? 'Configurado' : 'Não configurado');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Função para testar a conexão
export async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('questions')
      .select('count');

    if (error) {
      console.error('Connection error:', error);
      return false;
    }

    console.log('Connection successful:', data);
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

// Função para verificar a estrutura da tabela
export async function checkTableStructure() {
  try {
    console.log('Checking questions table structure...');
    
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Table structure check failed:', error);
      return false;
    }

    const requiredColumns = [
      'id',
      'text',
      'option_a',
      'option_b',
      'option_c',
      'option_d',
      'correct_answer',
      'value',
      'difficulty'
    ];

    if (!questions || questions.length === 0) {
      console.log('Table is empty but exists');
      return true;
    }

    const question = questions[0];
    const missingColumns = requiredColumns.filter(col => !(col in question));

    if (missingColumns.length > 0) {
      console.error('Missing columns:', missingColumns);
      return false;
    }

    console.log('Table structure is valid');
    return true;
  } catch (error) {
    console.error('Table structure check error:', error);
    return false;
  }
}

// Função para verificar o conteúdo da tabela
export async function checkTableContent() {
  try {
    console.log('Checking questions table content...');
    
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*');

    if (error) {
      console.error('Content check failed:', error);
      return { success: false, error: error.message };
    }

    console.log('Total questions found:', questions?.length || 0);
    console.log('Sample of questions:', questions?.slice(0, 2));
    
    return { 
      success: true, 
      count: questions?.length || 0,
      sample: questions?.slice(0, 2) || []
    };
  } catch (error) {
    console.error('Content check error:', error);
    return { success: false, error: String(error) };
  }
}
