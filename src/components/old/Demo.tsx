// Import necessary modules from Next.js
import Image from "next/image";
import React from "react";

// Define the component
const MyNextJsComponent: React.FC = () => {
  // Set the values for width and height
  const w = 1240;
  const h = 874;

  // Render the component
  return (
    <div>
      <div>
        <h1>Loading</h1>
        <h2 className="loader--text">0%</h2>
      </div>

      <header>
        <div>
          <h1>ScrollTrigger</h1>
          <h2>demo</h2>
        </div>
      </header>

      <section className="demo-text">
        <div className="wrapper text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
      </section>

      {[...Array(4)].map((_, i) => (
        <section key={i} className="demo-gallery">
          <ul className="wrapper">
            {[...Array(Math.floor(Math.random() * (4 - 3 + 1)) + 3)].map(
              (_, j) => (
                <li key={j}>
                  <Image
                    src={`https://source.unsplash.com/random/${w}x${h}?sig=${Math.floor(
                      Math.random() * 207
                    )}`}
                    width={w}
                    height={h}
                    alt={`Random Image ${j}`}
                  />
                </li>
              )
            )}
          </ul>
        </section>
      ))}

      <section className="demo-text">
        <div className="wrapper text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
      </section>

      <footer>
        <p>
          Images from <a href="https://unsplash.com/">Unsplash</a>
        </p>
      </footer>
    </div>
  );
};

export default MyNextJsComponent;
