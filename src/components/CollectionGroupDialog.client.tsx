import {Dialog, Transition} from '@headlessui/react';
import {Collection} from '@shopify/hydrogen/dist/esnext/storefront-api-types';
import clsx from 'clsx';
import {Fragment, useState} from 'react';
import type {SanityCollectionGroup} from '../types';
import CollectionGroupContent from './CollectionGroupContent.client';

export default function CollectionGroupDialog({
  collection,
  collectionGroup,
}: {
  collection: Collection;
  collectionGroup: SanityCollectionGroup;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div className="relative flex items-center">
      {/* Title */}
      <>
        <button
          className={clsx(
            '-mx-3 flex h-[2.4rem] items-center rounded-sm bg-darkGray bg-opacity-0 p-2 text-sm duration-150',
            'hover:bg-opacity-5',
          )}
          onClick={handleOpen}
        >
          <svg
            className="mr-[0.15rem] w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <rect
              x="5"
              y="14"
              width="6"
              height="6"
              stroke="#2C2E2E"
              strokeWidth="1.2"
            />
            <rect
              x="14"
              y="5"
              width="6"
              height="6"
              stroke="#2C2E2E"
              strokeWidth="1.2"
            />
            <circle cx="8" cy="8" r="3" stroke="#2C2E2E" strokeWidth="1.2" />
            <circle cx="17" cy="17" r="3" stroke="#2C2E2E" strokeWidth="1.2" />
          </svg>

          <div className="inline-flex items-center font-bold">
            {collectionGroup.title}
          </div>
        </button>
      </>
      <Transition show={isOpen}>
        <Dialog
          open={isOpen}
          className="relative z-50"
          onClose={handleClose}
          static
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 bg-black bg-opacity-20"
            />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-[450ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in-out duration-[400ms]"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel
              className={`fixed top-0 left-0 right-0 bottom-0 flex h-full w-full flex-col overflow-y-auto rounded-r-lg bg-white md:right-auto md:bottom-auto md:block md:w-[490px]`}
            >
              <CollectionGroupContent
                collection={collection}
                collectionGroup={collectionGroup}
                onClose={handleClose}
              />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
