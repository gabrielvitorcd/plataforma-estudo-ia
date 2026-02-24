'use client'

import { useState } from 'react'
import type { StudyMaterial } from '@/lib/types/materials'

type Props = {
    materials: StudyMaterial[]
}


export function MaterialsList({ materials }: Props) {
    const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null)

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                    <MaterialCard
                        key={material.id}
                        material={material}
                        onView={() => setSelectedMaterial(material)}
                    />
                ))}
            </div>

            {/* Modal */}
            {selectedMaterial && (
                <MaterialModal
                    material={selectedMaterial}
                    onClose={() => setSelectedMaterial(null)}
                />
            )}
        </>
    )
}

function MaterialCard({
    material,
    onView
}: {
    material: StudyMaterial
    onView: () => void
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            {/* Header */}
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {material.title}
            </h3>

            {/* Ações */}
            <div className="flex gap-3">
                <button
                    onClick={onView}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Ver Material
                </button>


            </div>
        </div>
    )
}


function MaterialModal({
    material,
    onClose
}: {
    material: StudyMaterial
    onClose: () => void
}) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {material.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-6">s
                    {/* Texto do material (se houver content_path) */}
                    {material.content_path && !material.video_url && !material.pdf_url && (
                        <div className="prose max-w-none">
                            <p className="text-gray-600">
                                Material disponível em: <code>{material.content_path}</code>
                            </p>
                        </div>
                    )}

                    {/* Botões de ação */}
                    <div className="flex gap-4 mt-6 pt-6 border-t">

                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}