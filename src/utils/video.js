export const loadVideoResource = (videoSrc) => {
    return new Promise(function (resolve, reject) {
        var video = document.createElement("video");
        video.src = videoSrc;
        video.crossOrigin = "anonymous";
        video.addEventListener("loadedmetadata", function (event) {
            video.currentTime = 1;
        });
        video.addEventListener("seeked", function () {
            resolve(video);
        });
        video.addEventListener("error", function (error) {
            reject(error);
        });
    });
};
export const captureFrame = (video) => {
    return new Promise(function (resolve) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(video.src);
        const data = canvas.toDataURL();
        fetch(data)
            .then((res) => {
            return res.blob();
        })
            .then((blob) => {
            const url = URL.createObjectURL(blob);
            resolve(url);
        });
    });
};
export const captureDuration = (video) => {
    return new Promise((resolve) => {
        resolve(video.duration);
    });
};
export const loadVideoEditorAssets = async (payload) => {
    const layers = [];
    for (const layer of payload.layers) {
        if (layer.type === "StaticVideo") {
            // @ts-ignore
            const video = await loadVideoResource(layer.src);
            const frame = (await captureFrame(video));
            const duration = await captureDuration(video);
            layers.push({
                ...layer,
                preview: frame,
            });
        }
        else {
            layers.push(layer);
        }
    }
    return {
        ...payload,
        layers: layers,
    };
};
