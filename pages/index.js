import {
  useEffect,
  useRef,
  useCallback,
} from 'react';

export default function Home() {
  const trackRef = useRef(null);

  const handleOnDown = useCallback((e) => {
    trackRef.current.mouseDownAt = e.clientX;
  }, []);

  const handleOnUp = useCallback((e) => {
    trackRef.current.mouseDownAt = 0;
    trackRef.current.prevPercentage = trackRef.current.percentage || 100;
  }, []);

  const handleOnMove = useCallback((e) => {
    const mouseDownAt = trackRef.current.mouseDownAt;
    const prevPercentage = trackRef.current.prevPercentage || 100;

    if (mouseDownAt === 0) return;
    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 100), -100);
    console.log(nextPercentage);
    trackRef.current.percentage = nextPercentage;

    if (trackRef.current) {
      trackRef.current.animate({
        transform: `translate(${nextPercentage}%, 0%)`,
      }, { duration: 1200, fill: 'forwards' });


      const images = trackRef.current.getElementsByClassName('image');
      for (const image of images) {
        image.animate({
          objectPosition: `${Math.abs(nextPercentage)}% center`,
        }, { duration: 1200, fill: 'forwards' });
      }
    }
  }, []);

  useEffect(() => {
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
    <div className="h-screen min-w-fit w-screen flex items-center justify-center bg-[#141414] overflow-hidden">
      <div
        ref={trackRef}
        className="image-track"
      >
        <img className="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
      </div>
    </div>
  );
}
