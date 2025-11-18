-- =============================
-- STUDY MATERIAL – ENEM / MATEMÁTICA
-- =============================
-- Funções do 1º grau
INSERT INTO public.study_material (topic_id, title, type, source, content_url, summary, reading_time_min, difficulty_level)
VALUES
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   JOIN public.track tr ON tr.id = s.track_id
   WHERE tr.code = 'enem' AND s.slug = 'matematica' AND t.name = 'Funções do 1º grau'),
  'Resumo de funções do 1º grau (ENEM)',
  'resumo',
  'Material autoral plataforma',
  'https://conteudo.plataforma-estudo/enem/matematica/funcoes-1-grau-resumo.pdf',
  'Resumo com definição de função afim, coeficiente angular, coeficiente linear e exemplos contextualizados.',
  20,
  2
);

-- Porcentagem e juros simples
INSERT INTO public.study_material (topic_id, title, type, source, content_url, summary, reading_time_min, difficulty_level)
VALUES
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   JOIN public.track tr ON tr.id = s.track_id
   WHERE tr.code = 'enem' AND s.slug = 'matematica' AND t.name = 'Porcentagem e juros simples'),
  'Vídeo-aula: porcentagem e juros simples no ENEM',
  'video',
  'YouTube',
  'https://www.youtube.com/watch?v=EXEMPLO_PORCENTAGEM_JUROS',
  'Vídeo com resolução de questões de porcentagem e juros simples semelhantes às cobradas no ENEM.',
  25,
  2
);

-- Estatística básica
INSERT INTO public.study_material (topic_id, title, type, source, content_url, summary, reading_time_min, difficulty_level)
VALUES
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   JOIN public.track tr ON tr.id = s.track_id
   WHERE tr.code = 'enem' AND s.slug = 'matematica' AND t.name = 'Estatística básica (média, mediana e moda)'),
  'PDF: Estatística básica para o ENEM',
  'pdf',
  'Material autoral plataforma',
  'https://conteudo.plataforma-estudo/enem/matematica/estatistica-basica.pdf',
  'Material em PDF com exemplos de cálculo de média, mediana e moda em contextos reais de prova.',
  30,
  2
);
--PAREI AQUI>>>>>>>>>>>>>-----------------------------------------------------------------------------------------------------
-- =============================
-- QUESTIONS – ENEM / MATEMÁTICA / FUNÇÕES DO 1º GRAU
-- =============================
INSERT INTO public.question (topic_id, statement, source, explanation, difficulty_level, tags)
VALUES
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   WHERE s.slug = 'matematica'
     AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
     AND t.name = 'Funções do 1º grau'),
  'A função f(x) = 2x + 1 é classificada como:',
  'Autorais inspiradas em ENEM',
  'Função afim (1º grau), com coeficiente angular 2 e termo independente 1.',
  1,
  ARRAY['enem','matematica','funcoes','funcao-afim']
),
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   WHERE s.slug = 'matematica'
     AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
     AND t.name = 'Funções do 1º grau'),
  'Em uma função do 1º grau, o coeficiente angular representa:',
  'Autorais inspiradas em ENEM',
  'O coeficiente angular indica a taxa de variação da função, ou seja, quanto y varia quando x aumenta em uma unidade.',
  1,
  ARRAY['enem','matematica','funcoes','coeficiente-angular']
),
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   WHERE s.slug = 'matematica'
     AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
     AND t.name = 'Funções do 1º grau'),
  'A reta de equação y = -3x + 6 corta o eixo y no ponto:',
  'Autorais inspiradas em ENEM',
  'O termo independente é 6, logo o ponto de interseção com o eixo y é (0, 6).',
  1,
  ARRAY['enem','matematica','funcoes','interseccao-eixo-y']
),
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   WHERE s.slug = 'matematica'
     AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
     AND t.name = 'Funções do 1º grau'),
  'Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:',
  'Autorais inspiradas em ENEM',
  'Funções crescentes possuem coeficiente angular positivo.',
  1,
  ARRAY['enem','matematica','funcoes','crescimento']
),
(
  (SELECT t.id FROM public.topic t
   JOIN public.subject s ON s.id = t.subject_id
   WHERE s.slug = 'matematica'
     AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
     AND t.name = 'Funções do 1º grau'),
  'A raiz da função f(x) = x - 5 é:',
  'Autorais inspiradas em ENEM',
  'Para encontrar a raiz, igualamos f(x) a zero: x - 5 = 0 ⇒ x = 5.',
  1,
  ARRAY['enem','matematica','funcoes','raiz']
);

-- OPTIONS – FUNÇÕES DO 1º GRAU (5 questões × 4 alternativas)

-- Q1: "A função f(x) = 2x + 1 é classificada como:"
INSERT INTO public.option (question_id, label, text, is_correct)
VALUES
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A função f(x) = 2x + 1 é classificada como:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'A',
  'Função afim (1º grau)',
  true
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A função f(x) = 2x + 1 é classificada como:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'B',
  'Função quadrática (2º grau)',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A função f(x) = 2x + 1 é classificada como:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'C',
  'Função constante',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A função f(x) = 2x + 1 é classificada como:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'D',
  'Função exponencial',
  false
);

-- Q2: "Em uma função do 1º grau, o coeficiente angular representa:"
INSERT INTO public.option (question_id, label, text, is_correct)
VALUES
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Em uma função do 1º grau, o coeficiente angular representa:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'A',
  'A taxa de variação da função',
  true
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Em uma função do 1º grau, o coeficiente angular representa:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'B',
  'O valor da função quando x = 0',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Em uma função do 1º grau, o coeficiente angular representa:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'C',
  'O produto de x e y',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Em uma função do 1º grau, o coeficiente angular representa:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'D',
  'O número de raízes da função',
  false
);

-- Q3: "A reta de equação y = -3x + 6 corta o eixo y no ponto:"
INSERT INTO public.option (question_id, label, text, is_correct)
VALUES
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A reta de equação y = -3x + 6 corta o eixo y no ponto:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'A',
  '(0, 6)',
  true
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A reta de equação y = -3x + 6 corta o eixo y no ponto:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'B',
  '(6, 0)',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A reta de equação y = -3x + 6 corta o eixo y no ponto:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'C',
  '(-3, 0)',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A reta de equação y = -3x + 6 corta o eixo y no ponto:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'D',
  '(0, -3)',
  false
);

-- Q4: "Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:"
INSERT INTO public.option (question_id, label, text, is_correct)
VALUES
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'A',
  'Maior que zero',
  true
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'B',
  'Menor que zero',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'C',
  'Igual a zero',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'Se uma função do 1º grau é crescente, então seu coeficiente angular deve ser:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'D',
  'Menor ou igual a zero',
  false
);

-- Q5: "A raiz da função f(x) = x - 5 é:"
INSERT INTO public.option (question_id, label, text, is_correct)
VALUES
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A raiz da função f(x) = x - 5 é:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'A',
  '5',
  true
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A raiz da função f(x) = x - 5 é:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'B',
  '-5',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A raiz da função f(x) = x - 5 é:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'C',
  '0',
  false
),
(
  (SELECT q.id FROM public.question q
   WHERE q.statement = 'A raiz da função f(x) = x - 5 é:'
     AND q.topic_id = (
       SELECT t.id FROM public.topic t
       JOIN public.subject s ON s.id = t.subject_id
       WHERE s.slug = 'matematica'
         AND s.track_id = (SELECT id FROM public.track WHERE code = 'enem')
         AND t.name = 'Funções do 1º grau'
     )),
  'D',
  '1',
  false
);



-- #########################################################################
-- POR QUESTÃO DE TAMANHO DA RESPOSTA
-- -------------------------------------------------------------------------
-- Acima eu te entreguei:
-- - tracks completos
-- - subjects para ENEM e Concursos (incluindo Matemática, Português, Dir. Constitucional, Adm. Pública)
-- - cadeia completa de seeds (topic → study_material → question → option)
--   para 1 tópico chave de Matemática (ENEM), já totalmente funcional.
--
-- A partir desse padrão, você pode:
-- - Copiar/colar os blocos de INSERT de question/option
-- - Trocar apenas:
--   - s.slug  (ex.: 'portugues', 'direito_constitucional', 'administracao_publica')
--   - t.name  (nome do tópico)
--   - statement / explanation / tags / alternativas
--
-- Se você quiser, no próximo passo eu gero:
-- - O mesmo nível de detalhe para:
--   - Português (ENEM)
--   - Direito Constitucional (Concursos)
--   - Administração Pública (Concursos)
--   cada um com 3 tópicos × 5 questões × 4 alternativas.
--
-- Assim você fica com um seed.sql grande, mas ainda controlável, e com
-- PADRÃO MUITO CLARO para replicar direto no seu projeto.
-- #########################################################################
