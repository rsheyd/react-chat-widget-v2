import { Provider } from 'react-redux';

import Widget from './components/Widget';

import store from './store';

import { AnyFunction } from './utils/types';

type Props = {
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  fullScreenMode?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  launcher?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId?: string;
  handleToggle?: AnyFunction;
  launcherOpenLabel?: string;
  launcherCloseLabel?: string;
  launcherCloseImg?: string;
  launcherOpenImg?: string;
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  emojis?: boolean;
  handleSubmit?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
};

function ConnectedWidget({
  title = 'Welcome',
  titleAvatar,
  subtitle = 'This is your chat subtitle',
  senderPlaceHolder = 'Type a message...',
  showCloseButton = true,
  fullScreenMode = false,
  autofocus = true,
  profileAvatar,
  profileClientAvatar,
  launcher,
  handleNewUserMessage,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId = 'rcw-chat-container',
  handleToggle,
  launcherOpenLabel = 'Open chat',
  launcherCloseLabel = 'Close chat',
  launcherCloseImg = '',
  launcherOpenImg = '',
  sendButtonAlt = 'Send',
  showTimeStamp = true,
  imagePreview = false,
  zoomStep = 80,
  handleSubmit,
  showBadge = true,
  resizable,
  emojis
}: Props) {
  return (
    <Provider store={store}>
      <Widget
        title={title}
        titleAvatar={titleAvatar}
        subtitle={subtitle}
        handleNewUserMessage={handleNewUserMessage}
        handleQuickButtonClicked={handleQuickButtonClicked}
        senderPlaceHolder={senderPlaceHolder}
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showCloseButton={showCloseButton}
        fullScreenMode={fullScreenMode}
        autofocus={autofocus}
        customLauncher={launcher}
        handleTextInputChange={handleTextInputChange}
        chatId={chatId}
        handleToggle={handleToggle}
        launcherOpenLabel={launcherOpenLabel}
        launcherCloseLabel={launcherCloseLabel}
        launcherCloseImg={launcherCloseImg}
        launcherOpenImg={launcherOpenImg}
        sendButtonAlt={sendButtonAlt}
        showTimeStamp={showTimeStamp}
        imagePreview={imagePreview}
        zoomStep={zoomStep} 
        handleSubmit={handleSubmit}
        showBadge={showBadge}
        resizable={resizable}
        emojis={emojis}
      />
    </Provider>
  );
}

export default ConnectedWidget;
