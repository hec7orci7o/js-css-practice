import Navbar from '@/components/Footer';
import Footer from '@/components/Navbar';

export default function Layout({children}) {
  return (
    <div className="h-screen min-w-fit w-screen flex flex-col overflow-y-auto">
      <Navbar/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
}
