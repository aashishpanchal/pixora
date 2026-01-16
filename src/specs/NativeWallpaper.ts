import {TurboModuleRegistry, type TurboModule} from 'react-native';

/**
 * Valid locations where a wallpaper can be applied.
 *
 * - `home`: Home screen only
 * - `lock`: Lock screen only
 * - `both`: Home and lock screens
 */
export type Location = 'home' | 'lock' | 'both';

interface Spec extends TurboModule {
  /**
   * Sets the wallpaper from a remote or local URL.
   *
   * @param url - The URL or local file path of the wallpaper image
   * @param location - The screen(s) where the wallpaper should be applied
   * @returns A promise that resolves when the wallpaper has been set
   */
  setWallpaper(url: string, location: Location): Promise<void>;
  /**
   * Checks whether the current platform supports setting wallpapers.
   *
   * @returns `true` if wallpaper setting is supported, otherwise `false`
   */
  isSupported(): boolean;
  /**
   * Checks whether setting the wallpaper is currently allowed.
   * This may depend on system permissions or OS restrictions.
   *
   * @returns `true` if setting the wallpaper is allowed, otherwise `false`
   */
  isSetAllowed(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('wallpaper');
