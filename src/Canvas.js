import React, { Component } from "react";
import "./Canvas.css"
import { initXYAxis, drawPoint, drawLine, drawSegment, drawCircle } from "./Geometry";

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')

    // Paint the xy-axis
    initXYAxis({ ctx, canvas })
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')

    // Reset all previous stuff
    ctx.save()
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Paint the xy-axis
    initXYAxis({ ctx, canvas })

    // Draws all objects again
    const objects = this.props.objects
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i]

      if (obj.length < 3)
        continue // not ready yet 

      console.log(obj)
      const type = obj[0]

      switch (type[0]) {
        case 'p':
          drawPoint({ ctx, canvas, obj })
          break;

        case 'l':
          drawLine({ ctx, canvas, obj })
          break;

        case 's':
          drawSegment({ ctx, canvas, obj })
          break;

        case 'c':
          drawCircle({ ctx, canvas, obj })
          break;

        default:
          console.log("wtf bro!!")
          break;
      }
    }

    ctx.restore();
  }

  render() {
    return <canvas width="800" height="500" className="image" ref={this.canvasRef} />;
  }
}

export default Canvas