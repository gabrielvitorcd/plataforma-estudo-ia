import { createClientServer } from '@/lib/supabaseServer'
import { getMaterialsByTopic } from '@/lib/api/materials'
import { notFound } from 'next/navigation'
import { MaterialsList } from './MaterialsList'

interface PageProps {
  params: Promise<{ topicCode: string }>;
}


export default async function AulaPage({ params }: PageProps) {
  const { topicCode } = await params;

  const supabase = await createClientServer();

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    console.error('❌ Sessão inválida na página de aulas')
    notFound()
  }

  let materials
  try {
    materials = await getMaterialsByTopic(
      topicCode,
      session.access_token
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound()
    }

    throw error
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {topicCode.replace(/-/g, ' ')}
        </h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            📚 Nenhum material disponível ainda para este tópico.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Em breve novos conteúdos serão adicionados!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">
          {topicCode.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600">
          {materials.length} {materials.length === 1 ? 'material disponível' : 'materiais disponíveis'}
        </p>
      </div>

      {/* Client Component que recebe dados do servidor */}
      <MaterialsList materials={materials} />
    </div>
  )
}

/**
 * Metadados da página (SEO).
 * 
 * Next.js usa isso para gerar <title>, <meta>, etc.
 */
export async function generateMetadata({ params }: PageProps) {
  const { topicCode } = await params;
  const topicName = topicCode.replace(/-/g, ' ');

  return {
    title: `Aulas - ${topicName}`,
    description: `Estude ${topicName} com vídeos, PDFs e exercícios.`,
  }
}