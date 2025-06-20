import type { ReactNode } from 'react';
import { AdminAsidebar } from '../../Admin/AdminAsidebar/AdminAsidebar';
import './_adminLayout.scss';

interface AdminLayoutProps {
    children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="adminLayout">
            <div className="adminLayoutContent">
                <AdminAsidebar />
                <main className="adminLayoutMain">
                    {children}
                </main>
            </div>
        </div>
    );
};
