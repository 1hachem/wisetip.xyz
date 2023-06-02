import { Typewriter } from "react-simple-typewriter";

const Title = () => {
  return (
    <div>
      <h1 className="text-7xl">
        How to choose{" "}
        <span className="text-blue-400">
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={[
              "the right sleeping bag ?",
              "the best jump rope ?",
              "a good fish ?",
              "the right watch ?",
            ]}
            loop={3}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={30}
            delaySpeed={500}
          />
        </span>
      </h1>
    </div>
  );
};

export default Title;
