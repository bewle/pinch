import Cropper from 'cropperjs';

export default function getZoomValue(element: HTMLImageElement) {
    const cropper = new Cropper(element);

    const cropData = cropper.getData();

    const zoomX = cropData.scaleX;
    const zoomY = cropData.scaleY;

    const zoom = zoomX; // Or zoomY, as they should be the same
}