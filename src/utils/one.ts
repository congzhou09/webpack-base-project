interface FishType {
  name: string;
  swim: () => void;
}

const oneFish: FishType = {
  name: 'zebra',
  swim: () => {
    console.log('I swim');
  },
};

oneFish.swim();

export default oneFish;
