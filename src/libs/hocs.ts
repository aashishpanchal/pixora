import {withUniwind} from '@niibase/uniwind';
import FastImage from 'react-native-fast-image';

/**
 * `UniImage` is a UniWind-enhanced version of `react-native-fast-image`.
 *
 * @example
 * ```tsx
 * <UniImage
 *   source={{ uri: 'https://example.com/image.png' }}
 *   className="w-32 h-32 rounded-lg"
 *   resizeMode="cover"
 * />
 */
export const UniImage = withUniwind(FastImage);
