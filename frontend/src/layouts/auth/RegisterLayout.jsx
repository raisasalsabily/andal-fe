import React from 'react';
import BasicLayout from '../general/BasicLayout';
import TutorialImg from '../../assets/images/tutorial.svg';
import Blob1 from '../../assets/shapes/blob_1.svg';
import Blob2 from '../../assets/shapes/blob_2.svg';
import RingDouble from '../../assets/shapes/ring_double.svg';
import VectorZigzag from '../../assets/vectors/vector_zigzag.svg';
import VectorPlus from '../../assets/vectors/vector_plus.svg';
import TopWave2 from '../../assets/waves/wave_top_2.svg';
import Tutorial from '../../components/tutorial/Tutorial';

function RegisterLayout({ children }) {
  return (
    <BasicLayout>
      <div id="left__pane__container" className="hidden lg:basis-1/2 lg:flex justify-center items-center px-16">
        {/* tutorial start */}
        <Tutorial imgSrc={TutorialImg} />
        {/* tutorial end */}
      </div>

      <div id="right__pane__container" className="w-full lg:basis-1/2 flex justify-center items-end">
        {/* decorations start */}
        {/* top wave decoration start */}
        <div className="z-50 lg:hidden fixed top-0 left-0 right-0 w-full">
          <img src={TopWave2} className="w-full" />
        </div>
        {/* top wave decoration end */}

        {/* right pane content start */}
        {children}
        {/* right pane content end */}
      </div>
    </BasicLayout>
  );
}

export default RegisterLayout;
