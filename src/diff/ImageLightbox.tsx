import * as React from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Button } from '../components/ui/button';

export interface ImageLightboxProps {
  src: string;
  alt: string;
  label: (key: string) => string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, label, onClose }: ImageLightboxProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="dshcm-ui dshcm-fixed dshcm-inset-0 dshcm-z-[1200] dshcm-flex dshcm-flex-col dshcm-bg-background/95 dshcm-text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label={label('imagePreview')}
    >
      <TransformWrapper
        key={src}
        initialScale={1}
        minScale={0.5}
        maxScale={8}
        centerOnInit
        centerZoomedOut
        limitToBounds
        wheel={{ step: 0.15 }}
        doubleClick={{ mode: 'toggle', step: 1.5 }}
        panning={{ velocityDisabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="dshcm-absolute dshcm-right-4 dshcm-top-4 dshcm-z-10 dshcm-flex dshcm-items-center dshcm-gap-1.5">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => void zoomOut()}
                aria-label={label('zoomOut')}
                title={label('zoomOut')}
              >
                <ZoomOut className="dshcm-size-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => void zoomIn()}
                aria-label={label('zoomIn')}
                title={label('zoomIn')}
              >
                <ZoomIn className="dshcm-size-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => void resetTransform()}
                aria-label={label('resetZoom')}
                title={label('resetZoom')}
              >
                <RotateCcw className="dshcm-size-4" />
              </Button>
              <Button
                ref={closeRef}
                type="button"
                variant="secondary"
                size="icon"
                onClick={onClose}
                aria-label={label('closeImage')}
                title={label('closeImage')}
              >
                <X className="dshcm-size-4" />
              </Button>
            </div>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="dshcm-max-h-[calc(100vh-96px)] dshcm-max-w-[calc(100vw-32px)] dshcm-select-none dshcm-object-contain"
              />
            </TransformComponent>
            <div className="dshcm-pointer-events-none dshcm-absolute dshcm-inset-x-0 dshcm-bottom-4 dshcm-flex dshcm-justify-center">
              <div className="dshcm-rounded-full dshcm-bg-secondary/90 dshcm-px-3 dshcm-py-1 dshcm-text-[11px] dshcm-text-muted-foreground">
                {label('zoomHint')}
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
      <span className="dshcm-pointer-events-none dshcm-absolute dshcm-left-4 dshcm-top-4 dshcm-z-10 dshcm-flex dshcm-max-w-[50vw] dshcm-items-center dshcm-gap-1.5 dshcm-rounded-md dshcm-bg-secondary/80 dshcm-px-2 dshcm-py-1 dshcm-text-[11px] dshcm-text-muted-foreground">
        <Maximize2 className="dshcm-size-3" />
        <span className="dshcm-truncate">{alt}</span>
      </span>
    </div>,
    document.body,
  );
}
