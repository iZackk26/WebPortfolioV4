import { useTranslation } from 'react-i18next';
import { METHOD_STEPS, STEP_HOLD_MS, STEP_INTERVAL_MS } from '../../../constants/method';
import { useStepCycle } from '../../../hooks/useStepCycle';

interface MethodFlowProps {
  running: boolean;
}

const stateFor = (index: number, current: number) => {
  if (index < current) return 'done';
  return index === current ? 'active' : 'pending';
};

/** Línea de tiempo Defino → Orquesto → Reviso → Entrego que avanza paso a paso. */
export const MethodFlow = ({ running }: MethodFlowProps) => {
  const { t } = useTranslation();
  const current = useStepCycle(METHOD_STEPS.length, running, STEP_INTERVAL_MS, STEP_HOLD_MS);

  return (
    <ol className="method-flow border-t border-black/10" aria-label={t('method.flowLabel')}>
      {METHOD_STEPS.map((step, i) => {
        const next = METHOD_STEPS[i + 1];
        return (
          <li
            key={step.key}
            className="method-step"
            data-actor={step.actor}
            data-next={next?.actor}
            data-state={stateFor(i, current)}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className="method-node" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>
              {t(`method.steps.${step.key}.title`)}
              <span className="method-badge" data-actor={step.actor}>
                {t(`method.actor.${step.actor}`)}
              </span>
            </h3>
            <p>{t(`method.steps.${step.key}.text`)}</p>
            {next && (
              <span className="method-link" aria-hidden="true">
                <i />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};
