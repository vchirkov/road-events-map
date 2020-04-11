export function sizeToResolution(size) {
    const pixelSize = Math.min(window.innerWidth, window.innerHeight);
    return size / pixelSize;
}
