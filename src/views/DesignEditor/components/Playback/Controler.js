import { nanoid } from "nanoid";
import * as PIXI from "pixi.js";
PIXI.settings.SORTABLE_CHILDREN = true;
class PlaybackController {
    /**
     * Pixi container canvas id
     */
    id;
    /**
     * Pixi wrapper DOM Reference
     */
    el;
    /**
     * Pixi app instance
     */
    app;
    /**
     * Resources map used to store the data needed to display the content
     */
    resources;
    /**
     * Resources map for audio elements
     */
    audioResources;
    clipResources;
    /**
     * Required options used to hold the elements data
     */
    status = "STOPPED";
    zoomRatio = 1;
    /**
     * Whether the pixi app has been initialized
     */
    initialized;
    template;
    constructor(id, options) {
        this.id = id;
        this.resources = new Map();
        this.audioResources = new Map();
        this.clipResources = new Map();
        this.initialized = false;
        this.zoomRatio = options.zoomRatio;
        this.template = options.template;
        this.initialize();
    }
    /**
     * Initializes Pixi App
     * @returns
     * @private
     */
    initialize = async () => {
        this.initializeContainer();
        this.initializeApplication();
        await this.initializeResources();
        this.initialized = true;
    };
    /**
     * Get the container where the App wil be appended
     * @returns
     * @private
     */
    initializeContainer = () => {
        const id = this.id;
        const el = document.getElementById(id);
        this.el = el;
    };
    /**
     * renders the content in the webgl layer
     * @param progress Time Progress
     * @returns
     * @public
     */
    render = (time) => {
        for (let [key, resource] of this.resources) {
            if (time > resource.display.from && time < resource.display.to) {
                this.applySpriteOptions(resource.sprite, { visible: true });
            }
            else {
                if (resource.type === "StaticVideo") {
                    this.hideAndMuteVideo(resource);
                }
                else {
                    this.applySpriteOptions(resource.sprite, { visible: false });
                }
            }
        }
    };
    hideAndMuteVideo = (resource) => {
        resource.sprite.visible = false;
        resource.video.muted = true;
    };
    /**
     * Show the resource content in the webgl layer
     * @public
     * @returns
     */
    play = () => {
        for (let [key, value] of this.resources) {
            this.applySpriteOptions(value.sprite, value.position);
            if (value.type === "StaticVideo") {
                value.video.muted = false;
                value.video.currentTime = 0;
            }
            value.sprite.visible = true;
            this.app.stage.addChild(value.sprite);
        }
    };
    /**
     * Changes the sprite options
     * Used to show or hide elements
     * @param sprite Pixi Sprite
     * @param {Object} options Object that contains the option values
     */
    applySpriteOptions = (sprite, options) => {
        for (const property in options) {
            // @ts-ignore
            sprite[property] = options[property];
        }
        if (options.x)
            sprite.x = options.x * this.zoomRatio;
        if (options.y)
            sprite.y = options.y * this.zoomRatio;
        if (options.width)
            sprite.width = options.width * options.scaleX * this.zoomRatio;
        if (options.height)
            sprite.height = options.height * options.scaleY * this.zoomRatio;
    };
    /**
     * Creates the Pixi app instance and appends it to the HTML Div container
     * @returns
     * @private
     */
    initializeApplication = () => {
        let app = new PIXI.Application({
            width: 1200 * this.zoomRatio,
            height: 1200 * this.zoomRatio,
            resizeTo: this.el,
            backgroundColor: 0xffffff,
            backgroundAlpha: 1,
        });
        this.el.appendChild(app.view);
        this.app = app;
    };
    /**
     * Loads the files and stores the data
     * @returns
     * @private
     */
    initializeResources = async () => {
        let layers = [];
        for (const clip of this.template.clips) {
            layers = layers.concat(clip.layers);
        }
        const updatedLayers = layers.map((layer) => {
            return {
                ...layer,
                id: nanoid(),
            };
        });
        const loader = new PIXI.Loader();
        for (const item of updatedLayers) {
            if (item.type === "StaticVideo" || item.type === "StaticAudio") {
                loader.add(item.id, item.url);
            }
            else {
                // Handle if it is an image
                if (item.url.match(/blob/)) {
                    loader.add(item.id, item.url, {
                        loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
                        xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB,
                    });
                }
                else {
                    loader.add(item.id, item.url);
                }
            }
        }
        return new Promise((resolve) => {
            loader.load((loader, resources) => {
                for (const [key, resource] of Object.entries(resources)) {
                    const element = updatedLayers.find((i) => i.id === key);
                    const object = resource.data;
                    if (element.type === "StaticVideo") {
                        object.muted = true;
                    }
                    let texture = PIXI.Texture.from(object);
                    let sprite = new PIXI.Sprite(texture);
                    this.resources.set(key, {
                        ...element,
                        sprite: sprite,
                        video: object,
                    });
                }
                resolve(true);
            });
        });
    };
}
export default PlaybackController;
