import type { PageServerLoad } from './$types';

import { getPublishedPosts } from '$lib/server/posts';

export const load = (() => ({
	posts: getPublishedPosts()
})) satisfies PageServerLoad;
