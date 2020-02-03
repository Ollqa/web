import { createElement } from 'react';
import Wrapper from './Wrapper';
import styled from '@emotion/styled';
import { ifProp } from 'styled-tools';

export interface SelectElementProps {
  color?: string;
  borderColor?: string;
  disabled?: boolean;
  autofocus?: boolean;
  error?: boolean;
  multiple?: boolean;
  size?: number;
  warning?: boolean;
  transparent?: boolean;
  theme?: any;
  width?: number | string;
}

export interface IOption {
  value: string;
  description?: string;
}

export interface SelectProps extends SelectElementProps {
  id?: string;
  readOnly?: boolean;
  placeholder?: string;
  border?: string;
  onChange?: (value: string) => void;
  value?: string;
  onClick?: () => void;
  options: IOption[];
}

const SelectElement = styled('select', {
  shouldForwardProp: prop =>
    !['borderColor', 'error', 'transparent'].includes(prop)
})<SelectElementProps>(
  ({ color, borderColor, theme, width = '100%' }) => ({
    width,
    height: 40,
    boxSizing: 'border-box',
    borderRadius: `${theme?.borderRadius?.n}px`,
    outline: 'none',
    backgroundColor: theme?.colors?.white,
    border: `1px solid ${theme?.colors?.[borderColor]}`,
    paddingLeft: '20px',
    boxShadow: '0 2px 4px 0 rgba(41, 50, 70, 0.1)',
    transition: '100ms ease all',
    fontFamily: theme?.fontFamily?.sf,
    fontSize: `${theme?.fontSizes?.s}px`,
    fontWeight: theme?.fontWeights?.normal,
    lineHeight: theme?.lineHeights?.s,
    color: theme?.colors?.[color],
    [':not([value=""])']: {
      boxShadow: 'none',
      borderColor: `${theme?.colors?.blueHaze}`
    },
    [':hover']: {
      boxShadow: 'none',
      borderColor: `${theme?.colors?.blueHaze}`,
      backgroundColor: `${theme?.colors?.webWhite}`
    },
    [':focus']: {
      boxShadow: '0 2px 6px 0 rgba(41, 50, 70, 0.4)',
      borderColor: `${theme?.colors?.lightGray}`,
      backgroundColor: `${theme?.colors?.white}`
    }
  }),
  ifProp('disabled', ({ theme }: any) => ({
    border: `1px solid ${theme?.colors?.blueHaze}`,
    color: `${theme?.colors?.blueHaze}`
  })),
  ifProp('error', ({ theme }: any) => ({
    borderColor: `${theme?.colors?.red}`,
    [':hover']: {
      borderColor: `${theme?.colors?.red}`
    },
    [':focus']: {
      borderColor: `${theme?.colors?.red}`
    }
  })),
  ifProp('warning', ({ theme }: any) => ({
    borderColor: `${theme?.colors?.orange}`,
    [':hover']: {
      borderColor: `${theme?.colors?.orange}`
    },
    [':focus']: {
      borderColor: `${theme?.colors?.orange}`
    }
  })),
  ifProp('transparent', {
    backgroundColor: 'transparent',
    border: 'none',
    [':hover']: {
      backgroundColor: 'transparent',
      border: 'none'
    },
    [':focus']: {
      backgroundColor: 'transparent',
      border: 'none'
    }
  })
);

const Select = ({ onChange, borderColor, options, ...props }: SelectProps) =>
  createElement(
    Wrapper,
    {},
    createElement(
      SelectElement,
      {
        border: borderColor,
        onChange: event => {
          onChange(event.target.value);
        },
        ...props
      },
      options.map((item, index) =>
        createElement(
          'option',
          { key: index, value: item.value },
          item.description
        )
      )
    )
  );

Select.defaultProps = {
  color: 'blueBayoux',
  borderColor: 'lightGray',
  onChange: () => {}
};

export default Select;
