"use client";

import { useRef } from 'react';
import WelcomeModal, { WelcomeModalHandle } from './WelcomeModal';

export default function WelcomeModalWrapper() {
  const modalRef = useRef<WelcomeModalHandle>(null);

  return (
    <>
      <WelcomeModal ref={modalRef} />
    </>
  );
}
