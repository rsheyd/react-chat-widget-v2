import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
const send = require('../../../../../../../assets/send_button.svg') as string;
const emoji = require('../../../../../../../assets/icon-smiley.svg') as string;

import './style.scss';

type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  buttonAlt: string;
  onPressEmoji: () => void;
  onChangeSize: (event: any) => void;
  onTextInputChange?: (event: any) => void;
}

function Sender({
  sendMessage,
  placeholder,
  disabledInput,
  autofocus,
  onTextInputChange,
  buttonAlt,
  onPressEmoji,
  onChangeSize
}: Props, ref) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useImperativeHandle(ref, () => ({
    onSelectEmoji: handlerOnSelectEmoji,
  }));

  const handlerOnChange = (event) => {
    onTextInputChange && onTextInputChange(event);
    setIsEmpty(event.target.value === '');
  };

  const handlerSendMessage = () => {
    const el = inputRef.current;
    if (el && el.value.trim()) {
      sendMessage(el.value);
      el.value = '';
      setIsEmpty(true);
    }
  };

  const handlerOnSelectEmoji = (emoji) => {
    const el = inputRef.current;
    if (el) {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const text = el.value;
      el.value = text.slice(0, start) + emoji.native + text.slice(end);
      setIsEmpty(false);
      el.setSelectionRange(start + emoji.native.length, start + emoji.native.length);
      el.focus();
    }
  };

  const handlerOnKeyPress = (event) => {
    if (event.charCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handlerSendMessage();
    }
  };

  return (
    <div ref={refContainer} className="rcw-sender">
      <button className='rcw-picker-btn' type="button" onClick={onPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button>
      <textarea
        ref={inputRef}
        className={cn('rcw-new-message', { 'rcw-message-disable': disabledInput })}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        onChange={handlerOnChange}
        onKeyPress={handlerOnKeyPress}
      />
      <button aria-label='send message' type="button" className="rcw-send" onClick={handlerSendMessage}>
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </div>
  );
}

export default forwardRef(Sender);
