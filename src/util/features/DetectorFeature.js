import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import {Fill} from 'ol/style';
import {circular} from 'ol/geom/Polygon';

export class DetectorFeature extends Feature {
    constructor(center) {
        super(circular(center, 200, 64).transform('EPSG:4326', 'EPSG:3857'));
        this.center = center;
        this.setStyle(new Style({
            fill: new Fill({
                color: [59, 205, 226, 0.2]
            })
        }));
    }

    move([x, y]) {
        const [px, py] = this.center;
        const [dx, dy] = [x - px, y - py];
        this.getGeometry().translate(dx, dy);
        this.center = [x, y];
    }

    // TODO: rework and add animate
    // animate() {
    //     this.start = Date.now();
    //     return (e) => {
    //         console.log(this.center);
    //         const vectorContext = getVectorContext(e);
    //         const geometry = circular(this.center, 20000000000, 64)
    //         // .transform('EPSG:4326', 'EPSG:3857');
    //
    //         vectorContext.setStyle(new Style({
    //             fill: new Fill({
    //                 color: [59, 205, 226, 1]
    //             })
    //         }));
    //         vectorContext.drawGeometry(geometry);
    //
    //         // const geometry = new Point(this.center);
    //         //
    //         // vectorContext.setStyle(new Style({
    //         //     image: new Circle({
    //         //         radius: 50,
    //         //         fill: new Fill({color: '#3bcde2'}),
    //         //         stroke: new Stroke({
    //         //             color: '#ffffff',
    //         //             width: 2
    //         //         })
    //         //     })
    //         // }));
    //         // vectorContext.drawGeometry(geometry);
    //     }
    // }
}
