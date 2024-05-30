import React, { useRef, useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CanvasProps {
  backgroundImage: string;
  onClear: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ backgroundImage, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    drawBackgroundImage();
    //eslint-disable-next-line
  }, [backgroundImage]);

  const drawBackgroundImage = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas?.width ?? 800, canvas?.height ?? 600);
        context.drawImage(image, 0, 0, canvas?.width ?? 800, canvas?.height ?? 600);
      };
      image.src = backgroundImage;
      image.onerror = (error) => {
        console.error('Failed to load the image', error);
        console.error('Image source:', image.src);
      };
    }
  };

  useEffect(() => {
    if (onClear) {
      clearCanvas();
    }
    //eslint-disable-next-line
  }, [onClear]);

  const clearCanvas = () => {
    setPoints([]);
    drawBackgroundImage();
  };

  const isClosedShape = (points: Point[]): boolean => {
    if (points.length < 3) return false;
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const dx = firstPoint.x - lastPoint.x;
    const dy = firstPoint.y - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 10;
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const newPoint = { x: e?.nativeEvent.offsetX, y: e?.nativeEvent.offsetY };
    const context = canvas?.getContext('2d');
    if (context) {
      context.moveTo(newPoint.x, newPoint.y);
      context.beginPath();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const newPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, newPoint];
      if (updatedPoints.length > 3 && isClosedShape(updatedPoints)) {
        setIsClosed(true);
      } else {
        setIsClosed(false);
      }
      return updatedPoints;
    });
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.lineTo(newPoint.x, newPoint.y);
      context.stroke();
      context.strokeStyle = 'white';
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (points.length >= 3 && isClosedShape(points)) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
      <p>{isClosed && 'Closed shape found'}</p>
    </>
  );
};

export default Canvas;
