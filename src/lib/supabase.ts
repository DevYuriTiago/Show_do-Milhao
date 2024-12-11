import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log environment configuration status
console.log('Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? '✓ Configured' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

// Initialize Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'show-do-milhao@1.0.0'
    }
  }
});

// Test connection and log detailed information
async function testConnection() {
  try {
    // Primeiro, tenta buscar uma única questão para testar a conexão
    const { data, error } = await supabase
      .from('questions')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase Connection Error:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return false;
    }

    console.log('Supabase Connection Success:', {
      connected: true,
      hasQuestions: data && data.length > 0,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Unexpected Supabase Error:', error);
    return false;
  }
}

// Execute connection test
testConnection().catch(console.error);

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
