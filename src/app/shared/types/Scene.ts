import { BackgroundProp } from './BackgroundProp';

export interface Scene {
  level_id: number;
  sky: boolean;
  sun: boolean;
  sunGlare: boolean;
  clouds: boolean;
  bgTimeAdptation: boolean[];
  bgTimeCustomItems: any[];
  bgDefault: BackgroundProp[];
}
