CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- A "Árvore" do Conteúdo
CREATE TABLE public.track (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE, -- Ex: 'enem', 'concursos'
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.exam (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES public.track(id),
  code text NOT NULL UNIQUE, -- Ex: 'enem-oficial', 'banca-cespe'
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.subject (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exam(id),
  code text NOT NULL UNIQUE, -- Ex: 'enem-matematica', 'enem-redacao'
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.topic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES public.subject(id),
  code text NOT NULL UNIQUE, -- Ex: 'mat-funcoes', 'mat-logaritmo'
  name text NOT NULL,
  order_index integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- O Conteúdo (Aulas e Testes)
CREATE TABLE public.study_material (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  title text NOT NULL,
  content_path text,     
  video_url text,        
  pdf_url text,          
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.quiz_question (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  statement text NOT NULL,        -- Enunciado
  options text[] NOT NULL,        -- Ex: ['Azul', 'Verde', 'Amarelo']
  correct_option_index smallint NOT NULL, -- Ex: 0 (Se 'Azul' for a correta)
  explanation text,               -- Gabarito comentado
  created_at timestamptz DEFAULT now()
);

-- O Usuário e o Progresso
CREATE TABLE public.app_user (
  id uuid PRIMARY KEY REFERENCES auth.users(id), -- Link com Auth do Supabase
  email text NOT NULL,
  name text,
  username text UNIQUE,
  role text DEFAULT 'student',
  xp_total integer DEFAULT 0,    
  current_track_id uuid REFERENCES public.track(id), -- O que ele está estudando agora
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_progress (
  user_id uuid NOT NULL REFERENCES public.app_user(id),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  is_completed boolean DEFAULT false,
  quiz_score integer DEFAULT 0,      
  last_accessed_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, topic_id)
);