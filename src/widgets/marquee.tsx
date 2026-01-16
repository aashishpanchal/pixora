import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';
import type {LayoutRectangle, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useFrameCallback,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';

/**
 * Direction the marquee scrolls in
 */
type MarqueeDirection = 'horizontal' | 'vertical';

/**
 * Props for the Marquee component
 */
export type MarqueeProps = React.PropsWithChildren<{
  /** Speed of the marquee animation (pixels per frame unit) */
  speed?: number;

  /** Space between repeated children */
  spacing?: number;

  /** Style applied to the outer container */
  style?: ViewStyle;

  /** Reverse the scroll direction */
  reverse?: boolean;

  /** Optional frame rate limiter (frames per second) */
  frameRate?: number;

  /** Scroll direction */
  direction?: MarqueeDirection;

  /** Optional shared value to expose the current animation position */
  position?: SharedValue<number>;
}>;

/**
 * Methods exposed via ref
 */
export type MarqueeRef = {
  /** Start the marquee animation */
  start: () => void;

  /** Stop the marquee animation */
  stop: () => void;

  /** Whether the animation is currently running */
  isActive: boolean;
};

/**
 * Renders a single animated clone of the children
 * Each clone is absolutely positioned and translated based on the shared animation value
 */
const AnimatedChild = ({
  index,
  children,
  anim,
  textMeasurement,
  spacing,
  direction,
}: React.PropsWithChildren<{
  /** Index of this clone */
  index: number;

  /** Shared animation value driving movement */
  anim: SharedValue<number>;

  /** Measured size of the content */
  textMeasurement: SharedValue<LayoutRectangle>;

  /** Spacing between clones */
  spacing: number;

  /** Scroll direction */
  direction: MarqueeDirection;
}>) => {
  /**
   * Animated style that moves the clone continuously
   */
  const stylez = useAnimatedStyle(() => {
    // Determine content size based on direction
    const size =
      direction === 'vertical'
        ? textMeasurement.value.height
        : textMeasurement.value.width;

    // Loop translation using modulo for infinite scrolling
    const translate = -(anim.value % (size + spacing));

    return {
      position: 'absolute',
      ...(direction === 'vertical'
        ? {
            top: (index - 1) * (size + spacing),
            transform: [{translateY: translate}],
          }
        : {
            left: (index - 1) * (size + spacing),
            transform: [{translateX: translate}],
          }),
    };
  }, [index, spacing]);

  return <Animated.View style={stylez}>{children}</Animated.View>;
};

/**
 * Marquee component
 *
 * Creates an infinitely scrolling view by cloning its children and translating them
 * using a frame-based animation.
 */
export const Marquee = React.memo(
  React.forwardRef<MarqueeRef, MarqueeProps>(
    (
      {
        speed = 1,
        children,
        spacing = 0,
        style,
        reverse,
        frameRate,
        direction = 'horizontal',
        position,
      },
      ref,
    ) => {
      /**
       * Layout measurement of the parent container
       */
      const parentMeasurement = useSharedValue<LayoutRectangle>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      });

      /**
       * Layout measurement of the children content
       */
      const textMeasurement = useSharedValue<LayoutRectangle>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      });

      /**
       * Number of clones needed to fully fill the viewport
       */
      const [cloneTimes, setCloneTimes] = React.useState(0);

      /**
       * Shared animation value used by all clones
       */
      const anim = useSharedValue(0);

      /**
       * Convert frameRate to milliseconds per frame if provided
       */
      const frameRateMs = frameRate ? 1000 / frameRate : null;

      /**
       * Frame callback runs on every rendered frame
       * and increments the animation value
       */
      const frameCallback = useFrameCallback(frameInfo => {
        if (frameInfo.timeSincePreviousFrame === null) return;

        // Normalize animation speed if a frame rate is provided
        const frameDelta = frameRateMs
          ? frameInfo.timeSincePreviousFrame / frameRateMs
          : 1;

        anim.value += (reverse ? -1 : 1) * speed * frameDelta;
      }, true);

      /**
       * Optionally expose animation position to the outside
       */
      useDerivedValue(() => {
        if (position) {
          position.value = anim.value;
        }
      });

      /**
       * Recalculate how many clones are needed when layout changes
       */
      useAnimatedReaction(
        () => {
          if (
            !textMeasurement.value.width ||
            !parentMeasurement.value.width ||
            !textMeasurement.value.height ||
            !parentMeasurement.value.height
          ) {
            return 0;
          }

          return (
            Math.round(
              direction === 'horizontal'
                ? parentMeasurement.value.width /
                    textMeasurement.value.width
                : parentMeasurement.value.height /
                    textMeasurement.value.height,
            ) + 1
          );
        },
        v => {
          if (v > 0) {
            // Must update React state on the JS thread
            scheduleOnRN(setCloneTimes, v + 2);
          }
        },
        [direction],
      );

      /** Start animation. */
      const start = () => frameCallback.setActive(true);

      /** Stop animation. */
      const stop = () => frameCallback.setActive(false);

      /** Expose imperative API. */
      React.useImperativeHandle(ref, () => ({
        start,
        stop,
        isActive: frameCallback.isActive,
      }));

      return (
        <Animated.View
          key={direction}
          style={style}
          onLayout={ev => {
            // Measure parent container
            parentMeasurement.value = ev.nativeEvent.layout;
          }}
          pointerEvents="box-none">
          <Animated.View style={styles.row} pointerEvents="box-none">
            {/* 
              Hidden ScrollView used only to measure children size.
              This avoids affecting layout while still triggering onLayout.
            */}
            <Animated.ScrollView
              horizontal={direction === 'horizontal'}
              style={styles.hidden}
              pointerEvents="none">
              <View
                onLayout={ev => {
                  textMeasurement.value = ev.nativeEvent.layout;
                }}>
                {children}
              </View>
            </Animated.ScrollView>
            {/* Render animated clones */}
            {cloneTimes > 0 &&
              [...Array(cloneTimes).keys()].map(index => (
                <AnimatedChild
                  key={`clone-${index}`}
                  index={index}
                  anim={anim}
                  textMeasurement={textMeasurement}
                  spacing={spacing}
                  direction={direction}>
                  {children}
                </AnimatedChild>
              ))}
          </Animated.View>
        </Animated.View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  hidden: {opacity: 0, zIndex: -9999},
  row: {flexDirection: 'row'},
});
