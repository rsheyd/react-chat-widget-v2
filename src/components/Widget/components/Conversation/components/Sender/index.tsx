import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt, onPressEmoji, onChangeSize }: Props, ref) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const refContainer = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [height, setHeight] = useState(0);

  useEffect(() => { 
    if (showChat && autofocus) inputRef.current?.focus(); 
  }, [showChat]);

  useImperativeHandle(ref, () => ({
    onSelectEmoji: handlerOnSelectEmoji,
  }));

  const handlerOnChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    onTextInputChange && onTextInputChange(newText);
    checkSize();
  };

  const handlerSendMessage = () => {
    if (text.trim()) {
      sendMessage(text.trim());
      setText(''); // Clear the textarea after sending the message
    }
  };

  const handlerOnSelectEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.native);
  };

  const handlerOnKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handlerSendMessage();
    }
  };

  const checkSize = () => {
    const senderEl = refContainer.current;
    if (senderEl && height !== senderEl.clientHeight) {
      const { clientHeight } = senderEl;
      setHeight(clientHeight);
      onChangeSize(clientHeight ? clientHeight - 1 : 0);
    }
  };

  const handlerPressEmoji = () => {
    onPressEmoji();
    checkSize();
  };

  return (
    <div ref={refContainer} className="rcw-sender">
      <button className='rcw-picker-btn' type="submit" onClick={handlerPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button>
      <div className={cn('rcw-new-message', { 'rcw-message-disable': disabledInput })}>
        <textarea
          className="rcw-input"
          placeholder={placeholder}
          disabled={disabledInput}
          ref={inputRef}
          value={text}
          onChange={handlerOnChange}
          onKeyPress={handlerOnKeyPress}
        />
      </div>
      <button aria-label='send message' type="submit" className="rcw-send" onClick={handlerSendMessage}>
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </div>
  );
}

export default forwardRef(Sender);
