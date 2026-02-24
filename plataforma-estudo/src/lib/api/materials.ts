import type { StudyMaterial, ApiError } from '@/lib/types/materials'

/**
 * Busca materiais de um tópico específico.
 * 
 * Esta função é usada em Server Components e precisa do token
 * de autenticação do Supabase.
 * 
 * @param topicCode - Código único do tópico (ex: 'mat-funcoes')
 * @param accessToken - Token JWT do Supabase
 * @returns Array de materiais ou lança erro
 */
export async function getMaterialsByTopic(
  topicCode: string,
  accessToken: string
): Promise<StudyMaterial[]> {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
  
  try {
    const response = await fetch(
      `${backendUrl}/api/study-materials/topic/${topicCode}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        // Importante: não cachear dados de usuário
        cache: 'no-store',
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      }
    )

    // Tratamento detalhado de erros HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      const error: ApiError = {
        detail: errorData.detail || `HTTP ${response.status}`,
        status: response.status,
      }

      // Log para debug (apenas em dev)
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Erro ao buscar materiais:', {
          topicCode,
          status: response.status,
          error: errorData,
        })
      }

      throw new Error(error.detail)
    }

    const materials: StudyMaterial[] = await response.json()

    // Log para debug (apenas em dev)
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Materiais carregados: ${materials.length} itens para "${topicCode}"`)
    }

    return materials

  } catch (error) {
    // Re-lançar com mensagem mais amigável
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Tempo de requisição esgotado. Tente novamente.')
      }
      throw error
    }
    throw new Error('Erro ao conectar com o servidor')
  }
}

/**
 * Busca um material específico por ID.
 * 
 * @param materialId - UUID do material
 * @param accessToken - Token JWT do Supabase
 * @returns Material ou lança erro
 */
export async function getMaterialById(
  materialId: string,
  accessToken: string
): Promise<StudyMaterial> {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
  
  try {
    const response = await fetch(
      `${backendUrl}/api/study-materials/${materialId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}`)
    }

    return await response.json()

  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao buscar material')
  }
}