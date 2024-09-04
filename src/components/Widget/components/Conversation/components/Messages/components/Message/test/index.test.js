import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { createNewMessage } from '../../../../../../../../../utils/messages';
import Message from '../index';

describe('<Message />', () => {

  const renderMessageComponent = (message) => 
    render(<Message message={message} />);

  it('should render a <strong> element', () => {
    const message = createNewMessage('New message with **Markdown**!');
    renderMessageComponent(message);
    const messageElement = screen.getByText(/New message with/);
    expect(messageElement).toContainHTML('<strong>Markdown</strong>');
  });

  it('should render an <em> element', () => {
    const message = createNewMessage('New message with *Markdown*!');
    renderMessageComponent(message);
    const messageElement = screen.getByText(/New message with/);
    expect(messageElement).toContainHTML('<em>Markdown</em>');
  });
});
