import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { createNewMessage, createLinkSnippet, createComponentMessage } from '../../../../../../../utils/messages';
import { createMockStore } from '../../../../../../../utils/store';

import Messages from '../index';
import Message from '../components/Message';
import Snippet from '../components/Snippet';

describe('<Messages />', () => {
  
  /* eslint-disable react/prop-types */
  const Dummy = ({ text }) => <div>{text}</div>;
  /* eslint-enable */
  const customComp = createComponentMessage(Dummy, { text: 'This is a Dummy Component!' });
  const message = createNewMessage('Response message 1');
  const linkSnippet = createLinkSnippet({ title: 'link', link: 'link' });
  const mockStore = createMockStore({ 
    messages: { 
      messages: [message, linkSnippet, customComp], 
      badgeCount: 0 
    } 
  });

  const renderMessagesComponent = () => 
    render(
      <Provider store={mockStore}>
        <Messages />
      </Provider>
    );

  it('should render a Message component', () => {
    renderMessagesComponent();
    expect(screen.getByText('Response message 1')).toBeInTheDocument();
  });

  // it('should render a Snippet component', () => {
  //   renderMessagesComponent();
  //   expect(screen.getByText('link')).toBeInTheDocument();
  // });

  it('should render a custom component', () => {
    renderMessagesComponent();
    expect(screen.getByText('This is a Dummy Component!')).toBeInTheDocument();
  });
});
