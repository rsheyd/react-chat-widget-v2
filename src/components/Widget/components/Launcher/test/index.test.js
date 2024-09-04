import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';

import Launcher from '../index';

const mockStore = configureMockStore();

describe('<Launcher />', () => {
  const createMessageComponent = ({ toggle, chatOpened, badge = 0 }) => {
    const store = mockStore({
      behavior: { showChat: chatOpened },
      messages: { badgeCount: badge },
    });

    return render(
      <Provider store={store}>
        <Launcher toggle={toggle} />
      </Provider>
    );
  };

  it('should call toggle prop when clicked', () => {
    const toggle = jest.fn();
    const chatOpened = false;
    createMessageComponent({ toggle, chatOpened });
    
    // Use getByRole to find the button and simulate the click
    const launcherButton = screen.getByRole('button', { name: /toggle chat/i });
    fireEvent.click(launcherButton);
    
    expect(toggle).toBeCalled();
  });

  // it('should render the open-launcher image when chatOpened = false', () => {
  //   const toggle = jest.fn();
  //   const chatOpened = false;
  //   createMessageComponent({ toggle, chatOpened });

  //   // Check if the open-launcher image is in the document
  //   const openLauncherImg = screen.getByRole('img', { name: /open launcher/i });
  //   expect(openLauncherImg).toBeInTheDocument();
  // });

  // it('should render the close-launcher image when chatOpened = true', () => {
  //   const toggle = jest.fn();
  //   const chatOpened = true;
  //   createMessageComponent({ toggle, chatOpened });

  //   // Check if the close-launcher image is in the document
  //   const closeLauncherImg = screen.getByRole('img', { name: /close launcher/i });
  //   expect(closeLauncherImg).toBeInTheDocument();
  // });

  // it('should render Badge component when closed and new message is in', () => {
  //   const toggle = jest.fn();
  //   const chatOpened = false;
  //   const badge = 1;
  //   createMessageComponent({ toggle, chatOpened, badge });

  //   // Check if the badge component is rendered with the correct badge count
  //   const badgeElement = screen.getByText('1');
  //   expect(badgeElement).toBeInTheDocument();
  // });
});
