import axios from "axios";
const pixabayClient = axios.create({
    baseURL: "https://pixabay.com/api/",
});
const PIXABAY_KEY = import.meta.env.VITE_APP_PIXABAY_KEY;
export const getPixabayImages = (query) => {
    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    return new Promise((resolve, reject) => {
        pixabayClient
            .get(`?key=${PIXABAY_KEY}&q=${encodedWord}&image_type=photo`)
            .then((response) => {
            resolve(response.data.hits);
        })
            .catch((err) => reject(err));
    });
};
export const getPixabayVideos = (query) => {
    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    return new Promise((resolve, reject) => {
        pixabayClient
            .get(`/videos?key=${PIXABAY_KEY}&q=${encodedWord}&per_page=20`)
            .then((response) => {
            const hits = response.data.hits;
            const videos = hits.map((hit) => ({
                id: hit.id,
                type: "StaticVideo",
                src: hit.videos.tiny.url,
                preview: hit.videos.tiny.url,
                duration: hit.duration,
            }));
            resolve(videos);
        })
            .catch((err) => reject(err));
    });
};
