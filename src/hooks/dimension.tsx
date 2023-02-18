import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const GAP = 16;
export function useCardLayout(margin: number = GAP, totalGapBetween = GAP) {
  const {width, height} = useWindowDimensions();
  const isTablet = DeviceInfo.isTablet();

  const cardWidth = useMemo(() => {
    if (isTablet) {
      return (width - margin * 2 - totalGapBetween) / 2;
    }
    return width - margin * 2;
  }, [width]);

  return {
    width,
    height,
    cardWidth,
    isTablet,
    column: isTablet ? 2 : undefined,
  };
}
