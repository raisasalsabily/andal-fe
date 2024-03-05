import { useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';

function PositionDetailV2() {
  const [open, setOpen] = useState(false);

  const ScheduleData = [
    { location: 'SMPN 2 Temanggung', time: '8.00 - 13.00' },
    { location: 'TPA Nurul Amin', time: '18.00 - 19.00' }
  ];

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // const handleOpenBottomSheet = () => {
  //   setIsBottomSheetOpen(true);
  // };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <GeofencePageLayout pageTitle="Detail Posisi">
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <ChildInfoBox ScheduleData={ScheduleData} />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:block absolute top-20 left-6 bg-white rounded-xl">
        <ChildInfoBox ScheduleData={ScheduleData} />
      </div>
    </GeofencePageLayout>
  );
}

export default PositionDetailV2;
