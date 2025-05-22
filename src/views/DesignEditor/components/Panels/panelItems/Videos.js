import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { useEditor } from "@layerhub-io/react";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import { getPixabayVideos } from "~/services/pixabay";
import { getPexelsVideos } from "~/services/pexels";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
const loadVideoResource = (videoSrc) => {
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
const captureFrame = (video) => {
    return new Promise(function (resolve) {
        var canvas = document.createElement("canvas");
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
const captureDuration = (video) => {
    return new Promise((resolve) => {
        resolve(video.duration);
    });
};
const Videos = () => {
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const [videos, setVideos] = React.useState([]);
    const { scenes, setScenes, currentScene } = useDesignEditorContext();
    const loadPixabayVideos = async () => {
        const videos = await getPixabayVideos("people");
        setVideos(videos);
    };
    const loadPexelsVideos = async () => {
        const videos = (await getPexelsVideos("people"));
        setVideos(videos);
    };
    React.useEffect(() => {
        loadPexelsVideos();
    }, []);
    const addObject = React.useCallback(async (options) => {
        if (editor) {
            const video = await loadVideoResource(options.src);
            const frame = await captureFrame(video);
            const duration = await captureDuration(video);
            editor.objects.add({ ...options, duration, preview: frame });
            const updatedScenes = scenes.map((scn) => {
                if (scn.id === currentScene?.id) {
                    return {
                        ...currentScene,
                        duration: duration * 1000 > currentScene.duration ? duration * 1000 : currentScene.duration,
                    };
                }
                return scn;
            });
            setScenes(updatedScenes);
        }
    }, [editor, scenes, currentScene]);
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Videos" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsx(Block, { padding: "0 1.5rem", children: _jsx("div", { style: { display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }, children: videos.map((video, index) => {
                            return _jsx("img", { width: "120px", src: video.preview, onClick: () => addObject(video) }, index);
                        }) }) }) })] }));
};
const ImageItem = ({ preview, onClick }) => {
    const [css] = useStyletron();
    return (_jsxs("div", { onClick: onClick, className: css({
            position: "relative",
            background: "#f8f8fb",
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
            "::before:hover": {
                opacity: 1,
            },
        }), children: [_jsx("div", { className: css({
                    backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    height: "100%",
                    width: "100%",
                    ":hover": {
                        opacity: 1,
                    },
                }) }), _jsx("img", { src: preview, className: css({
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    verticalAlign: "middle",
                }) })] }));
};
export default Videos;
