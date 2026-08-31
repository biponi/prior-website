"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { absoluteUrl } from "@/lib/seo";

interface CategoryInfoDialogProps {
  name: string;
  description: string;
  img?: string;
}

export default function CategoryInfoDialog({
  name,
  description,
  img,
}: CategoryInfoDialogProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const trigger = (
    <button
      type='button'
      aria-label={`About ${name}`}
      onClick={() => setOpen(true)}
      className='inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-200 hover:text-gray-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 shrink-0'>
      <Info className='h-4 w-4' />
    </button>
  );

  const content = (
    <div className='flex flex-col h-full'>
      {/* Close button */}
      <button
        onClick={() => setOpen(false)}
        aria-label='Close'
        className='absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 backdrop-blur-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 shadow-sm'>
        <X className='h-4 w-4' />
      </button>

      {/* Hero image */}
      {img && (
        <div className='relative h-48 w-full overflow-hidden shrink-0'>
          <img
            src={absoluteUrl(img)}
            alt={name}
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent' />
        </div>
      )}

      {/* Content */}
      <div
        className={`${img ? "-mt-12" : "pt-6"} relative px-6 pb-6 flex flex-col flex-1 min-h-0`}>
        {/* Badge */}
        <span className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-600 w-fit mb-3'>
          Category
        </span>

        {/* Title */}
        <h2 className='text-xl font-bold text-gray-900 tracking-tight mb-4'>
          {name}
        </h2>

        {/* Separator */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4' />

        {/* Description */}
        <ScrollArea className='flex-1 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {description ? (
            <div
              className='prose prose-sm max-w-none text-gray-600 leading-relaxed
                [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-5 [&_h2]:mb-2
                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-1.5
                [&_p]:mb-3 [&_p]:leading-[1.7]
                [&_ul]:space-y-1.5 [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:list-disc
                [&_ol]:space-y-1.5 [&_ol]:my-3 [&_ol]:pl-5 [&_ol]:list-decimal
                [&_li]:text-gray-600
                [&_strong]:text-gray-800 [&_strong]:font-semibold
                [&_em]:text-gray-500
                [&_a]:text-rose-500 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-rose-200 hover:[&_a]:decoration-rose-400
                [&_blockquote]:border-l-2 [&_blockquote]:border-rose-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
                [&_img]:rounded-xl [&_img]:my-4 [&_img]:shadow-sm'
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <div className='flex flex-col items-center justify-center py-10 text-center'>
              <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100'>
                <Info className='h-5 w-5 text-gray-400' />
              </div>
              <p className='text-sm font-medium text-gray-500'>
                No details available yet.
              </p>
              <p className='mt-1 text-xs text-gray-400'>
                Check back soon for updates.
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );

  // Mobile: Drawer from bottom
  if (isMobile) {
    return (
      <>
        {trigger}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className='h-auto'>
            <div className='relative h-full'>
              <DrawerTitle className='sr-only'>{name}</DrawerTitle>
              <DrawerDescription className='sr-only'>
                About {name}
              </DrawerDescription>
              {content}
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: Sheet from right
  return (
    <>
      {trigger}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className='w-[420px] sm:max-w-[420px] p-0 overflow-hidden'>
          <SheetTitle className='sr-only'>{name}</SheetTitle>
          <SheetDescription className='sr-only'>About {name}</SheetDescription>
          {content}
        </SheetContent>
      </Sheet>
    </>
  );
}
