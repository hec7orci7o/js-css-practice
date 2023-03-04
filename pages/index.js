import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <div className='w-full h-full'>
      <Gallery />
    </div>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;
