import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto justify-items-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-lg w-[80%] md:w-[70%]'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-white'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            For users who want to request a service from a handy man
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-white'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-black',
            }}
          >
            For handyman who wants to register their profile and services
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
