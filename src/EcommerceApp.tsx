import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { AppRouter } from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify';
import { AppProviders } from "./context/AppProviders";
import 'react-toastify/dist/ReactToastify.css';

export const EcommerceApp = () => {
    return (
        <AppProviders>
            <Header />
            <AppRouter />
            <Footer />
            <ToastContainer />
        </AppProviders>
    );
}
