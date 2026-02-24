-- supabase/seed.sql
INSERT INTO public.track (code, name, description)
VALUES 
  ('enem', 'ENEM', 'Trilha focada no Exame Nacional do Ensino Médio'),
  ('concursos', 'Concursos Públicos', 'Trilha focada em concursos públicos brasileiros');

INSERT INTO public.exam (track_id, code, name)
VALUES
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'enem-oficial',
    'ENEM - Prova Oficial'
  );

INSERT INTO public.subject (exam_id, code, name)
VALUES
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-matematica', 
    'Matemática e suas Tecnologias'
  ),
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-portugues',
    'Linguagens e Códigos (Português)'
  ),
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-redacao',
    'Redação'
  ),
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-ciencias-natureza',
    'Ciências da Natureza'
  ),
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-ciencias-humanas',
    'Ciências Humanas'
  ),
  (
    (SELECT id FROM public.exam WHERE code = 'enem-oficial'),
    'enem-ingles',
    'Inglês'
  );

INSERT INTO public.topic (subject_id, code, name, order_index)
VALUES
  -- Tópico 1
  (
    (SELECT id FROM public.subject WHERE code = 'enem-matematica'),
    'enem-mat-operacoes',
    'Operações Fundamentais (adição, subtração, multiplicação, divisão)',
    1
  ),
  -- Tópico 2
  (
    (SELECT id FROM public.subject WHERE code = 'enem-matematica'),
    'enem-mat-conjuntos',
    'Números e Conjuntos Numéricos',
    2
  ),
  -- Tópico 3
  (
    (SELECT id FROM public.subject WHERE code = 'enem-matematica'),
    'enem-mat-fracoes',
    'Frações, Porcentagem, Razão e Proporção',
    3
  ),
  -- Tópico 4
  (
    (SELECT id FROM public.subject WHERE code = 'enem-matematica'),
    'enem-mat-potenciacao',
    'Potenciação e Radiciação',
    4
  );

DELETE FROM public.study_material;

INSERT INTO public.study_material (topic_id, title, content_path)
VALUES
  (
    (SELECT id FROM public.topic WHERE code = 'enem-mat-operacoes'),
    'Nota de Aula 1: Operações Fundamentais',
    'enem-math/matematica_enem_topic_01.md'
  ),
  (
    (SELECT id FROM public.topic WHERE code = 'enem-mat-conjuntos'),
    'Nota de Aula 2: Números e Conjuntos Numéricos',
    'enem-math/matematica_enem_topic_02.md'
  ),
  (
    (SELECT id FROM public.topic WHERE code = 'enem-mat-fracoes'),
    'Nota de Aula 3: Frações e Porcentagem',
    'enem-math/matematica_enem_topic_03.md'
  ),
  (
    (SELECT id FROM public.topic WHERE code = 'enem-mat-potenciacao'),
    'Nota de Aula 4: Potenciação e Radiciação',
    'enem-math/matematica_enem_topic_04.md'
  );