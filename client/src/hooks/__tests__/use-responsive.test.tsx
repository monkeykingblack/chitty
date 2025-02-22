/// <reference lib="dom" />
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useResponsive } from '../use-responsive';

describe('useResponsive', () => {
  const setWindowWidth = (width: number) => {
    act(() => {
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
    });
  };

  setWindowWidth(1024);
  const hook = renderHook(() => useResponsive());

  it('should response to window width change', () => {
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: false,
    });
    setWindowWidth(300);
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    });
    setWindowWidth(700);
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: true,
      md: false,
      lg: false,
      xl: false,
    });
    setWindowWidth(800);
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    });
    setWindowWidth(1000);
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: false,
    });
    setWindowWidth(1200);
    expect(hook.result.current).toMatchObject({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
    });
  });

  it('should cleanup event listeners when unmounted', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useResponsive());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  it('should handle multiple hook instances correctly', () => {
    const { result: result1 } = renderHook(() => useResponsive());
    const { result: result2 } = renderHook(() => useResponsive());

    setWindowWidth(800);

    expect(result1.current).toEqual(result2.current);
    expect(result1.current.md).toBe(true);
    expect(result2.current.md).toBe(true);
  });
});
