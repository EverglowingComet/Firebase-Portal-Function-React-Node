import { toDateTimeString } from "utils/Utils";


export default function GalleryCell(props) {
    const item = props.item;

    return (
        <div className="gallery-item-wrapper">
            <div className="gallery-item-info">
                <img className="gallery-item-thumb" alt="thumbnail" src={item.photoUri} />
            </div>
            <div>
                <h4 className="gallery-item-title">
                    {item.title}
                </h4>
                <div className="gallery-item-date">
                    {toDateTimeString(item.timestamp)}
                </div>
            </div>
        </div>
    )
}