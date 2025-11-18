def create_material_service(db, data):
    query = """
        INSERT INTO public.study_material
        (topic_id, title, type, source, content_url, summary, reading_time_min, difficulty_level, embedding_vector)
        VALUES
        (%s, %s, %s, %s, %s, %s, %s, %s, NULL)
        RETURNING id;
    """

    cur = db.cursor()
    cur.execute(query, (
        data.topic_id,
        data.title,
        data.type,
        data.source,
        data.content_url,
        data.summary,
        data.reading_time_min,
        data.difficulty_level
    ))

    new_id = cur.fetchone()[0]
    db.commit()
    return new_id
