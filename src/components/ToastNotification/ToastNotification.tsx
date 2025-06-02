type ToastNotificationProps = {
    image: string;
    message: string;
    altText: string;
};

export const ToastNotification = ({ image, message, altText }: ToastNotificationProps) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={image} alt={altText} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
            <span>{message}</span>
        </div>
    );
};
