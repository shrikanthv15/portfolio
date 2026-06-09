"use client";

import Mascot from "./Mascot";
import CompanionThread from "./CompanionThread";
import { useDialogueTour } from "./useDialogueTour";
import { useSectionDriver } from "./useSectionDriver";

/**
 * Kratos = the pet (locomotion engine) + the scroll-driven dialogue thread.
 * Click the pet → tour starts; an IntersectionObserver pushes each section's
 * lines once as you scroll (decoupled from the pet's animation loop).
 */
export default function KratosCompanion() {
  const tour = useDialogueTour();
  useSectionDriver(tour.pushSection, tour.status === "touring");

  return (
    <>
      <Mascot onPetClick={tour.start} talking={tour.typing} />
      <CompanionThread
        status={tour.status}
        messages={tour.messages}
        typing={tour.typing}
        onDismiss={tour.dismiss}
        onReplay={tour.replay}
        onSkip={tour.skip}
      />
    </>
  );
}
