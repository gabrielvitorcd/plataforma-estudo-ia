def create_material_service(db, data):
    query = """
        INSERT INTO public.study_material
        (topic_id, title, source, content_path, content_urls_videos, summary, reading_time_min, difficulty_level)
        VALUES
        (%(topic_id)s, %(title)s, %(source)s, %(content_path)s, %(content_urls_videos)s,
         %(summary)s, %(reading_time_min)s, %(difficulty_level)s)
        RETURNING id;
    """

    cur = db.cursor()
    cur.execute(query, {
        "topic_id": data.topic_id,
        "title": data.title,
        "source": data.source,
        "content_path": data.content_path,
        "content_urls_videos": data.content_urls_videos,
        "summary": data.summary,
        "reading_time_min": data.reading_time_min,
        "difficulty_level": data.difficulty_level
    })

    new_id = cur.fetchone()[0]
    db.commit()
    return new_id
