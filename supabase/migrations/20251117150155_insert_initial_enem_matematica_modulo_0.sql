-- ============================================
-- SEEDS INICIAIS PARA PLATAFORMA (ENEM + CONCURSOS)
-- Estrutura: track → subject → topic → study_material → question → option
-- PKs usam DEFAULT gen_random_uuid() (via DEFAULT das tabelas)
-- ============================================

-- =============================
-- TRACKS
-- =============================
INSERT INTO public.track (code, name, description)
VALUES 
  ('enem', 'ENEM', 'Trilha focada no Exame Nacional do Ensino Médio'),
  ('concursos', 'Concursos Públicos', 'Trilha focada em concursos públicos brasileiros');

-- =============================
-- SUBJECTS – ENEM
-- =============================
INSERT INTO public.subject (track_id, slug, name, area, description)
VALUES
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'matematica',
    'Matemática',
    'Matemática e suas Tecnologias',
    'Conteúdos de matemática do ENEM, com foco em resolução de problemas contextualizados.'
  ),
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'portugues',
    'Português',
    'Linguagens, Códigos e suas Tecnologias',
    'Leitura, interpretação de textos, gramática e habilidades de linguagem exigidas no ENEM.'
  ),
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'redacao',
    'Redação',
    'Linguagens, Códigos e suas Tecnologias',
    'Produção textual dissertativo-argumentativa conforme a matriz de competências do ENEM.'
  ),
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'ciencias_natureza',
    'Ciências da Natureza',
    'Ciências da Natureza',
    'Física, Química e Biologia com foco em situações-problema no contexto do ENEM.'
  ),
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'ciencias_humanas',
    'Ciências Humanas',
    'Ciências Humanas',
    'História, Geografia, Sociologia e Filosofia integradas em temas contemporâneos.'
  ),
  (
    (SELECT id FROM public.track WHERE code = 'enem'),
    'ingles',
    'Inglês',
    'Linguagens, Códigos e suas Tecnologias',
    'Leitura e interpretação de textos em língua inglesa no estilo das questões do ENEM.'
  );


-- #########################################################################
-- ENEM – MATEMÁTICA
-- #########################################################################

-- =============================
-- TOPICS – ENEM / MATEMÁTICA — MÓDULO 0 (PRÉ-REQUISITOS)
-- =============================
INSERT INTO public.topic (subject_id, name, order_index, difficulty_level, type_common, source)
VALUES
  (
    (SELECT id FROM public.subject 
     WHERE slug = 'matematica' 
       AND track_id = (SELECT id FROM public.track WHERE code = 'enem')),
    'Operações Fundamentais (adição, subtração, multiplicação, divisão e propriedades)',
    1,
    1,
    'enem',
    'Base matemática'
  ),
  (
    (SELECT id FROM public.subject 
     WHERE slug = 'matematica' 
       AND track_id = (SELECT id FROM public.track WHERE code = 'enem')),
    'Números e Conjuntos Numéricos (Naturais, Inteiros, Racionais, Irracionais e dízimas)',
    2,
    1,
    'enem',
    'Base matemática'
  ),
  (
    (SELECT id FROM public.subject 
     WHERE slug = 'matematica' 
       AND track_id = (SELECT id FROM public.track WHERE code = 'enem')),
    'Frações, Porcentagem, Razão e Proporção (operações, aumentos, descontos, regra de três)',
    3,
    1,
    'enem',
    'Base matemática'
  ),
  (
    (SELECT id FROM public.subject 
     WHERE slug = 'matematica' 
       AND track_id = (SELECT id FROM public.track WHERE code = 'enem')),
    'Potenciação e Radiciação (propriedades, simplificações e racionalização)',
    4,
    1,
    'enem',
    'Base matemática'
  );

-----------------------------------------------------
