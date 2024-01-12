import { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RE_DIGIT = new RegExp(/^\d+$/);

const propTypes = {
  autoFocus: PropTypes.bool,
  valueLength: PropTypes.number,
  value: PropTypes.string,
  groupClass: PropTypes.string,
  itemClass: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
};

function AvOptInput({
  value = '',
  valueLength = 4,
  onChange,
  autoFocus = true,
  groupClass = '',
  itemClass = '',
  size = 10,
}) {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target) => {
    const nextElementSibling = target.nextElementSibling;

    if (nextElementSibling) nextElementSibling.focus();
  };
  const focusToPrevInput = (target) => {
    const previousElementSibling = target.previousElementSibling;

    if (previousElementSibling) previousElementSibling.focus();
  };
  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') return;

    const nextInputEl = target.nextElementSibling;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') return;

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) return;

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;

    if (key === 'Escape') target.blur();

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') return;

    focusToPrevInput(target);
  };
  const inputOnFocus = (e) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className={classNames('w-full max-w-[360px] flex gap-3', groupClass)}>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          autoFocus={autoFocus && idx === 0}
          type='text'
          inputMode='numeric'
          autoComplete='off'
          pattern='\d{1}'
          maxLength={valueLength}
          className={classNames(
            `border-2 border-sky-500 rounded h-${size} w-${size} text-xl font-bold p-0 text-center`,
            itemClass
          )}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}

AvOptInput.propTypes = propTypes;

export default AvOptInput;
