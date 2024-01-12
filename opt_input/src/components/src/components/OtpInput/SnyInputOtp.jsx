import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
  classNameItem: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleItem: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
const defaultProps = {
  autoFocus: true,
  value: '0000',
  maxLength: 4,
  size: 10,
};

function SnyInputOtp(props) {
  const { value = '', maxLength, autoFocus, onChange, className, classNameItem, style, styleItem, size } = props;
  const codeDigitsArray = new Array(maxLength).fill(0);
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(autoFocus || false);
  const textInputRef = useRef(null);

  useEffect(() => {
    autoFocus && handleOnPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnPress = () => {
    textInputRef?.current?.focus();
  };
  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  const handleOnFocus = () => {
    setInputContainerIsFocused(true);
  };

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = ' ';
    const digit = value[index] || emptyInputChar;
    const isCurrentDigit = index === value.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = value.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const styleOtpInput = inputContainerIsFocused && isDigitFocused;

    return (
      <div
        key={index}
        className={classNames('flex items-center justify-center', classNameItem, {
          [`h-${size} w-${size} border-2 border-sky-500 rounded bg-slate-200`]: styleOtpInput,
          [`h-${size} w-${size} border-2 border-sky-500 rounded`]: !styleOtpInput,
        })}
        style={styleItem}
      >
        <div>{digit}</div>
      </div>
    );
  };

  return (
    <div className='sny-input-otp'>
      <div
        onClick={handleOnPress}
        className={classNames('flex items-center justify-between w-52 font-semibold text-sky-500', className)}
        style={style}
      >
        {codeDigitsArray.map(toCodeDigitInput)}
      </div>
      <input
        className='absolute w-0 h-0 opacity-0'
        {...props}
        ref={textInputRef}
        value={value}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        maxLength={maxLength}
      />
    </div>
  );
}

SnyInputOtp.propTypes = propTypes;
SnyInputOtp.defaultProps = defaultProps;

export default SnyInputOtp;
