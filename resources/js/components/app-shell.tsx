import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useLayout } from '@/contexts/LayoutContext';
import type { SharedData } from '@/types';
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

export function AppShell({ children, variant = 'header' }: Props) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    const { position } = useLayout();

    return <SidebarProvider defaultOpen={isOpen}>
        <div className={cn('flex w-full', position === 'right' ? 'flex-row-reverse': 'flex-row')}>
            {children}
        </div>
        </SidebarProvider>;
}
