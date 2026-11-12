interface ConsentSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** Interruptor Aero: un checkbox real (teclado y lector de pantalla) con piel de vidrio */
export const ConsentSwitch = ({ id, label, checked, onChange }: ConsentSwitchProps) => (
  <label className="consent-switch" htmlFor={id}>
    <input id={id} type="checkbox" role="switch" aria-label={label} checked={checked} onChange={(event) => onChange(event.target.checked)} />
    <span aria-hidden="true" />
  </label>
);
