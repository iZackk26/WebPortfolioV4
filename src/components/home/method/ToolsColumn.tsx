import { useTranslation } from 'react-i18next';
import { AI_TOOLS } from '../../../constants/method';

interface ToolsColumnProps {
  playing: boolean;
}

const KEY_DELAY_MS = 60;

/** "Lo acelero con IA": herramientas como teclas y el modelo que uso, en grafito. */
export const ToolsColumn = ({ playing }: ToolsColumnProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-w-0 flex-col gap-3.5 border-t border-dashed border-black/10 p-[20px_22px_22px] md:border-l md:border-t-0 md:border-solid">
      <span className="method-badge" data-actor="ai">
        {t('method.ai')}
      </span>
      <ul aria-label={t('method.toolsLabel')} className={`method-keys m-0 flex list-none flex-wrap gap-2 p-0 ${playing ? 'is-playing' : ''}`}>
        {AI_TOOLS.map((tool, i) => (
          <li key={tool} className="method-key" data-accent={i === 0} style={{ ['--d' as string]: `${i * KEY_DELAY_MS}ms` }}>
            <span>{tool}</span>
          </li>
        ))}
      </ul>
      <p className="m-0 flex items-center gap-2.5 text-sm text-black/60">
        <span className="method-model-tag">Opus</span>
        {t('method.model')}
      </p>
    </div>
  );
};
