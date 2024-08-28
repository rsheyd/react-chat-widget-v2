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
    const { getByTestId } = renderWidget();
    expect(getByTestId('widget-layout')).toBeInTheDocument();
  });

  it('should prevent event default behavior', () => {
    const { getByTestId } = renderWidget();
    const widgetLayout = getByTestId('widget-layout');
    fireEvent.submit(widgetLayout, newMessageEvent);
    expect(newMessageEvent.preventDefault).toHaveBeenCalled();
  });

  it('should call prop when calling newMessageEvent', () => {
    const { getByTestId } = renderWidget();
    const widgetLayout = getByTestId('widget-layout');
    fireEvent.submit(widgetLayout, newMessageEvent);
    expect(handleUserMessage).toHaveBeenCalled();
  });

  it('should clear the message input when newMessageEvent', () => {
    const { getByTestId } = renderWidget();
    const widgetLayout = getByTestId('widget-layout');
    fireEvent.submit(widgetLayout, newMessageEvent);
    expect(newMessageEvent.target.message.value).toBe('');
  });
});
