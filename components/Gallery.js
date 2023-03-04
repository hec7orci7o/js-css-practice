/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useCallback} from 'react';
import {images} from '@/data/images';

export default function Gallery() {
  const trackRef = useRef();

  const handleOnDown = useCallback((e) => {
    trackRef.current.mouseDownAt = e.clientX;
  }, []);

  const handleOnUp = useCallback((e) => {
    trackRef.current.mouseDownAt = 0;
    trackRef.current.prevPercentage = trackRef.current.percentage;
  }, []);

  const handleOnMove = useCallback((e) => {
    const mouseDownAt = trackRef.current.mouseDownAt;
    const prevPercentage = trackRef.current.prevPercentage ?? 0;

    if (mouseDownAt === 0 || isNaN(mouseDownAt)) return;
    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;

    const nextPercentageUnconstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -125);
    trackRef.current.percentage = nextPercentage;

    if (trackRef.current) {
      trackRef.current.animate({
        transform: `translate(${50 + nextPercentage}%, -50%)`,
      }, { duration: 1200, fill: 'forwards' });


      const images = trackRef.current.getElementsByClassName('image');
      const normalized = nextPercentage / -125 * 100;
      for (const image of images) {
        image.animate({
          objectPosition: `${100 - normalized}% center`,
        }, { duration: 1200, fill: 'forwards' });
      }
    }
  }, []);

  useEffect(() => {
    if (innerWidth < 768) return;

    window.addEventListener('touchstart', (e) => handleOnDown(e.changedTouches[0]));
    window.addEventListener('touchmove', (e) => handleOnMove(e.changedTouches[0]));
    window.addEventListener('touchend', (e) => handleOnUp(e.changedTouches[0]));
    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('mouseup', handleOnUp);
    return () => {
      window.removeEventListener('mousedown', (e) => handleOnDown(e.changedTouches[0]));
      window.removeEventListener('mousemove', (e) => handleOnMove(e.changedTouches[0]));
      window.addEventListener('touchend', (e) => handleOnUp(e.changedTouches[0]));
      window.addEventListener('mousedown', handleOnDown);
      window.addEventListener('mousemove', handleOnMove);
      window.addEventListener('mouseup', handleOnUp);
    };
  }, [handleOnDown, handleOnUp, handleOnMove]);

  return (
    <div
      ref={trackRef}
      className="grid grid-cols-1 sm:grid-cols-3 md:flex md:items-center gap-2 md:absolute md:top-1/2 md:translate-x-1/2 md:-translate-y-1/2 select-none"
    >
      {images.map((image, index) => (
        <a
          key={image.id}
          href={image.href}
          target="_blank"
          referrerPolicy='no-referrer'
          className="link relative md:mx-0 mx-auto" rel="noreferrer"
        >
          <span
            className='text-white absolute top-0 left-0 text-sm md:text-2xl font-bold px-4 py-2'
            draggable={false}
          >
            {image.alt}
          </span>
          <img
            src={image.src}
            alt={image.alt}
            className="image duration-1000 cursor-pointer"
            draggable={false}
          />
        </a>
      ))}
    </div>
  );
}
