import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Components
import { Image } from '.';

// Constants
import { SRC_IMAGE_NOT_AVAILABLE } from '@/constants';

// Mock useState
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Image Component', () => {
  const props = {
    width: 100,
    height: 100,
    className: 'mock-class',
    alt: 'Mock Alt',
    src: 'mock.src',
  };

  const ImageComponent = () => {
    return render(<Image {...props} alt="Mock Alt" />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Match snapshot', () => {
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockReturnValue([true, jest.fn()]);

    const { container } = render(
      <Image {...props} src={SRC_IMAGE_NOT_AVAILABLE} alt="Mock Alt" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('Sets fallback source on error', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockReturnValue([SRC_IMAGE_NOT_AVAILABLE, setState]);

    const { getByAltText } = ImageComponent();
    const image = getByAltText(props.alt);

    fireEvent.error(image);

    expect(setState).toHaveBeenCalledWith(SRC_IMAGE_NOT_AVAILABLE);
  });
});
