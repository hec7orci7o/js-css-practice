import Navbar from '@/components/Footer';
import Footer from '@/components/Navbar';

export default function Layout({children}) {
  return (
    <div className="h-screen min-w-fit w-screen">
      <Navbar/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
}
