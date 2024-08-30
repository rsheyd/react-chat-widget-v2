import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'

import assetMock from '../../../../mocks/fileMock';
import { createMockStore } from '../../../utils/store';
import Widget from '../index';


const mockStore =  createMockStore()

describe('<Widget />', () => {
  const profile = assetMock;
  const handleUserMessage = jest.fn();
  const newMessageEvent = {
    target: {
      message: {
        value: 'New message',
      },
    },
    preventDefault: jest.fn(),
  };

  const renderWidget = () =>
    render(
      <Provider store={mockStore}>
        <Widget handleNewUserMessage={handleUserMessage} profileAvatar={profile} />
      </Provider>
    );

  it('should render WidgetLayout', () => {
    const { getByRole } = renderWidget();
    expect(getByRole('region', { name: /widget layout/i })).toBeInTheDocument();
  });

  // it('should open widget when chat button is toggled', async () => {
  //   // Render the widget
  //   const { getByRole, findByRole, debug } = renderWidget();
  
  //   // Find the toggle button by its accessible name
  //   const toggleButton = getByRole('button', { name: /toggle chat/i });
  
  //   // Click the toggle button
  //   fireEvent.click(toggleButton);
  
  //   // Debug to check the DOM state after the event
  //   debug();
  
  //   // Use findByRole to wait for the send button to appear
  //   const sendButton = await findByRole('button', { name: /send message/i });
  
  //   // Assert that the send button is now in the document
  //   expect(sendButton).toBeInTheDocument();
  // });

  // it('should prevent event default behavior', () => {
  //   const { getByTestId } = renderWidget();
  //   const widgetLayout = getByTestId('widget-layout');
  //   fireEvent.submit(widgetLayout, newMessageEvent);
  //   expect(newMessageEvent.preventDefault).toHaveBeenCalled();
  // });

  // it('should call prop when calling newMessageEvent', () => {
  //   const { getByTestId } = renderWidget();
  //   const widgetLayout = getByTestId('widget-layout');
  //   fireEvent.submit(widgetLayout, newMessageEvent);
  //   expect(handleUserMessage).toHaveBeenCalled();
  // });

  // it('should clear the message input when newMessageEvent', () => {
  //   const { getByTestId } = renderWidget();
  //   const widgetLayout = getByTestId('widget-layout');
  //   fireEvent.submit(widgetLayout, newMessageEvent);
  //   expect(newMessageEvent.target.message.value).toBe('');
  // });
});
