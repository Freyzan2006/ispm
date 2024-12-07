


import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";



interface IProps {
  id: string;
}



const BgAnimation: React.FC<IProps> = (props) => {

  const [_, setInit] = useState<boolean>(false);



  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
     
    }).then(() => {
      setInit(true);
    });
  }, []);



  const options: any  = useMemo(
    () => ({
      background: {
        color: {
          value: "rgb(15 23 42 / var(--tw-bg-opacity))",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },


      particles: {
        color: {
          value: "#f1f1f16b",
        },
        links: {
          color: "#f1f1f16b",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


  return <Particles id={props.id} options={options} />
};

export default BgAnimation;