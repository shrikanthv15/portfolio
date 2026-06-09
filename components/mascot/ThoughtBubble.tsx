/** Pure-CSS thought bubble. Engine controls `text` + `visible`. */
export default function ThoughtBubble({
  text,
  visible,
}: {
  text: string;
  visible: boolean;
}) {
  return (
    <div className={`ink-bubble${visible ? " is-visible" : ""}`} role="status" aria-live="polite">
      <span>{text}</span>
      <span className="ink-bubble__tail" aria-hidden>
        <i />
        <i />
      </span>
    </div>
  );
}
