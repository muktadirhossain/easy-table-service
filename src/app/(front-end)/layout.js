import Header from "@/components/nav/Header";

export default function MainLayout({ children }) {
    return (
        <main className="min-h-screen dark:bg-slate-900 dark:text-slate-400 text-black">
            <Header />
            {children}
        </main>
    );
}
