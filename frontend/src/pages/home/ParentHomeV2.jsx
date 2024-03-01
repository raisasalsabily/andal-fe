import ChildBox from '../../components/box/ChildBox';
import HomeLayout from '../../layouts/home/HomeLayout';
import Sidebar from '../../components/navigation/Sidebar';

function ParentHomeV2() {
  const ChildrenList = [
    { fullName: 'Fiorenza Celestyn', profPic: '' },
    { fullName: 'Maura Yufi Septania', profPic: '' },
    { fullName: 'Isyana Sarawati', profPic: '' }
  ];

  return (
    <HomeLayout>
      <div className="mx-6">
        {/* page title start */}
        <h5 className="text-h-sm font-bold py-6 text-violet-900">Daftar Anak</h5>
        {/* page title end */}
        {/* children list start */}
        <div className="flex lg:flex-col flex-wrap lg:flex-nowrap w-full justify-between gap-2 lg:gap-4">
          {ChildrenList.map(({ fullName, profPic, index }) => (
            <ChildBox fullName={fullName} profPic={profPic} index={index} />
          ))}
        </div>
      </div>
      {/* children list end */}
    </HomeLayout>
  );
}

export default ParentHomeV2;
