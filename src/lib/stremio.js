/**
 * Drop any meta that would fail Stremio catalog validation.
 * Every meta requires at least an `id` and a valid `type` ('movie' | 'series').
 */
function filterValidMetas(metas) {
  if (!Array.isArray(metas)) {
    return [];
  }

  return metas.filter(meta => meta?.id && (meta?.type === 'movie' || meta?.type === 'series'));
}

/**
 * Replace posters with RPDB (Rating Poster DB) URLs if RPDB key is provided
 */
export function replaceRpdbPosters(rpdbKey, metas) {
  const validMetas = filterValidMetas(metas);

  if (!rpdbKey) {
    return validMetas;
  }

  return validMetas.map(meta => {
    return {
      ...meta,
      poster: `https://api.ratingposterdb.com/${rpdbKey}/imdb/poster-default/${meta.id}.jpg`
    };
  });
}

