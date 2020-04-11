import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import {Circle, Fill, Stroke} from 'ol/style';
import Point from 'ol/geom/Point';

export class MarkerFeature extends Feature {
    constructor(center) {
        super(new Point(center));
        this.center = center;
        this.setStyle(new Style({
            image: new Circle({
                radius: 14,
                fill: new Fill({color: '#3bcde2'}),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: 2
                })
            })
        }));
    }

    move([x, y]) {
        const [px, py] = this.center;
        const [dx, dy] = [x - px, y - py];
        this.getGeometry().translate(dx, dy);
        this.center = [x, y];
    }
}
