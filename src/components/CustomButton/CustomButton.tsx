import './_customButton.scss'

type CustomButtonProps = {
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export const CustomButton: React.FC<CustomButtonProps> = ({ children, color = 'primary' }) => {
    return (
        <button className={`customButton customButton--${color}`}>
            {children}
        </button>
    )
}
