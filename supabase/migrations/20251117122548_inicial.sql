CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE public.track (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE public.app_user (
  id uuid PRIMARY KEY, -- FK → auth.users
  email text NOT NULL UNIQUE,
  name text,
  username text UNIQUE,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student','admin')),
  avatar_url text,
  study_goal_id uuid REFERENCES public.track(id),
  daily_study_time_min integer,
  level text,
  xp_total integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT app_user_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);


CREATE TABLE public.subject (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES public.track(id),
  slug text NOT NULL,
  name text NOT NULL,
  area text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(track_id, slug)
);


CREATE TABLE public.topic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES public.subject(id),
  name text NOT NULL,
  order_index integer,
  difficulty_level smallint,
  type_common text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE public.study_material (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  title text NOT NULL,
  type text NOT NULL,
  source text,
  content_url text NOT NULL,
  summary text,
  reading_time_min integer,
  difficulty_level smallint,
  embedding_vector jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE public.question (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  statement text NOT NULL,
  image_url text,
  source text,
  explanation text,
  difficulty_level smallint,
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE public.option (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.question(id) ON DELETE CASCADE,
  label text NOT NULL,
  text text NOT NULL,
  is_correct boolean NOT NULL,
  UNIQUE(question_id, label)
);


CREATE TABLE public.study_session (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.app_user(id),
  track_id uuid NOT NULL REFERENCES public.track(id),
  subject_id uuid REFERENCES public.subject(id),
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  total_time_sec integer,
  xp_earned integer DEFAULT 0,
  notes text,
  device_info text,
  focus_score smallint
);


CREATE TABLE public.question_attempt (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.app_user(id),
  question_id uuid NOT NULL REFERENCES public.question(id),
  study_session_id bigint REFERENCES public.study_session(id),
  selected_option_id uuid REFERENCES public.option(id),
  is_correct boolean NOT NULL,
  time_spent_seconds integer,
  explanation_requested boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE public.user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.app_user(id),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  mastery_score smallint NOT NULL DEFAULT 0,
  theta real NOT NULL DEFAULT 0,
  attempts_count integer NOT NULL DEFAULT 0,
  average_accuracy real,
  time_spent_total_sec integer NOT NULL DEFAULT 0,
  last_review_date date,
  xp_earned integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

CREATE TABLE public.topic_prerequisite (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES public.topic(id),
  prerequisite_id uuid NOT NULL REFERENCES public.topic(id),
  relation_type text NOT NULL DEFAULT 'prerequisite',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(topic_id, prerequisite_id)
);

CREATE TABLE public.achievement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.app_user(id),
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  icon_url text,
  awarded_at timestamptz NOT NULL DEFAULT now()
);
