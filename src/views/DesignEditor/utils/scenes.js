export const findSceneIndexByTime = (scenes, time) => {
    let currentIndex = 0;
    let timeProgress = 0;
    for (const scene of scenes) {
        if (scene.duration > time - timeProgress) {
            return currentIndex;
        }
        timeProgress += scene.duration;
        currentIndex += 1;
    }
    return -1;
};
export const getMaxTime = (scenes) => {
    const maxTime = scenes.reduce(function (previousVal, currentValue) {
        return previousVal + currentValue.duration;
    }, 0);
    return maxTime;
};
