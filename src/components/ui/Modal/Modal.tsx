import ReactDOM from 'react-dom';
import './_modal.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    mainImage: string;
    setMainImage: (img: string) => void;
    images?: string[];
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, mainImage, setMainImage, images }) => {
    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
                <img className='modalMainImage' src={mainImage} alt="Main" />
                <div className="modalThumbnails">
                {images?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className={`thumbnail ${mainImage === image ? 'active' : 'inactive'}`}
                        onClick={() => setMainImage(image)}
                    />
                ))}
                </div>
                <button className="modalClose" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>,
        modalRoot
    );
};