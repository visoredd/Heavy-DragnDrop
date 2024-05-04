import React, { useState } from "react";
import "./App.css";

interface Shape {
  id: number;
  type: "circle" | "square";
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Line {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
const predefinedColors = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF33F7",
  "#33F7FF",
  "#F7FF33",
  "#333333",
  "#666666",
  "#990000",
  "#FFFF33",
];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
};
const App: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [draggingShape, setDraggingShape] = useState<Shape | null>(null);
  const [startShapeId, setStartShapeId] = useState<number | null>(null);

  const createShape = (x: number, y: number) => {
    const newShape: Shape = {
      id: Date.now(),
      type: "circle",
      x,
      y,
      size: Math.floor(Math.random() * 51) + 30,
      color: getRandomColor(),
    };
    setShapes([...shapes, newShape]);
  };

  const toggleShape = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    setShapes(
      shapes.map((shape) =>
        shape.id === id
          ? { ...shape, type: shape.type === "circle" ? "square" : "circle" }
          : shape
      )
    );
    if (draggingShape && draggingShape.id === id) {
      setDraggingShape(null);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    shape: Shape
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(shape));
    setDraggingShape(shape);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggingShape) {
      const { movementX, movementY } = e.nativeEvent;
      const updatedShape: Shape = {
        ...draggingShape,
        x: draggingShape.x + movementX,
        y: draggingShape.y + movementY,
      };
      setShapes(
        shapes.map((shape) =>
          shape.id === updatedShape.id ? updatedShape : shape
        )
      );
    }
  };

  const handleDragEnd = () => {
    setDraggingShape(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggingShape) {
      const { offsetX, offsetY } = e.nativeEvent;
      const updatedShape: Shape = {
        ...draggingShape,
        x: offsetX,
        y: offsetY,
      };
      setShapes(
        shapes.map((shape) =>
          shape.id === updatedShape.id ? updatedShape : shape
        )
      );
      setLines(
        lines.map((line) => {
          if (
            line.startX === draggingShape.x &&
            line.startY === draggingShape.y
          ) {
            return { ...line, startX: updatedShape.x, startY: updatedShape.y };
          } else if (
            line.endX === draggingShape.x &&
            line.endY === draggingShape.y
          ) {
            return { ...line, endX: updatedShape.x, endY: updatedShape.y };
          }
          return line;
        })
      );
    }
  };

  const handleCircleClick = (id: number) => {
    if (!startShapeId) {
      setStartShapeId(id);
    } else {
      const startShape = shapes.find((shape) => shape.id === startShapeId);
      const endShape = shapes.find((shape) => shape.id === id);
      if (startShape && endShape) {
        const newLine: Line = {
          id: `${startShapeId}-${id}`,
          startX: startShape.x,
          startY: startShape.y,
          endX: endShape.x,
          endY: endShape.y,
        };
        setLines([...lines, newLine]);
      }
      setStartShapeId(null);
    }
  };

  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      {shapes.map((shape) =>
        shape.type === "circle" ? (
          <div
            key={shape.id}
            className="shape circle"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              top: shape.y - shape.size / 2,
              left: shape.x - shape.size / 2,
            }}
            onContextMenu={(e) => toggleShape(e, shape.id)}
            onDragStart={(e) => handleDragStart(e, shape)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={() => handleCircleClick(shape.id)}
            draggable
          />
        ) : (
          <div
            key={shape.id}
            className="shape square"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              top: shape.y - shape.size / 2,
              left: shape.x - shape.size / 2,
            }}
            onClick={() => handleCircleClick(shape.id)}
            onDoubleClick={(e) => toggleShape(e, shape.id)}
          />
        )
      )}
      {lines.map((line, index) => (
        <svg key={index} className="line">
          <line
            x1={line.startX}
            y1={line.startY}
            x2={line.endX}
            y2={line.endY}
          />
        </svg>
      ))}

      <div
        className="canvas"
        onDoubleClick={(e) =>
          createShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      ></div>
    </div>
  );
};

export default App;
