-- Habilita RLS (Row Level Security) para a tabela questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura anônima
CREATE POLICY "enable_select_for_all" 
ON public.questions
FOR SELECT 
TO public 
USING (true);

-- Política para permitir todas as operações para usuários autenticados
CREATE POLICY "enable_all_for_authenticated_users" 
ON public.questions
TO authenticated 
USING (true)
WITH CHECK (true);

-- Política para permitir leitura anônima na tabela game_results
ALTER TABLE public.game_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enable_select_for_all_game_results" 
ON public.game_results
FOR SELECT 
TO public 
USING (true);

-- Política para permitir inserção para todos na tabela game_results
CREATE POLICY "enable_insert_for_all_game_results" 
ON public.game_results
FOR INSERT 
TO public 
WITH CHECK (true);

-- Configuração de CORS
INSERT INTO auth.config (config)
VALUES ('{"CORS_ORIGINS": ["*"]}')
ON CONFLICT (singleton) DO UPDATE
SET config = EXCLUDED.config;
