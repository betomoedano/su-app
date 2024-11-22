import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TextVariant =
  | 'body'
  | 'headline'
  | 'paragraph'
  | 'label'
  | 'huge'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'callout'
  | 'footnote'
  | 'caption'
  | 'code';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'black';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  secondary?: boolean;
  weight?: FontWeight;
}

const fontFamilies: Record<FontWeight, string> = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
  black: 'SF-Pro-Display-Black',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  className,
  secondary = false,
  weight,
}) => {
  const baseStyles = 'text-zinc-900 dark:text-zinc-50';
  const secondaryStyles = secondary ? 'text-zinc-400 dark:text-zinc-600' : '';

  const variantStyles: Record<TextVariant, { className: string; defaultWeight: FontWeight }> = {
    huge: {
      className: 'text-[29px] md:text-[34px] lg:text-[39px]',
      defaultWeight: 'black',
    },
    h1: {
      className: 'text-[23px] md:text-[27px] lg:text-[31px]',
      defaultWeight: 'semibold',
    },
    h2: {
      className: 'text-[19px] md:text-[22px] lg:text-[25px]',
      defaultWeight: 'semibold',
    },
    h3: {
      className: 'text-[16px] md:text-[18px] lg:text-[20px]',
      defaultWeight: 'semibold',
    },
    headline: { className: 'text-[16px]', defaultWeight: 'medium' },
    body: { className: 'text-[16px]', defaultWeight: 'regular' },
    paragraph: { className: 'text-[16px]', defaultWeight: 'regular' },
    label: { className: 'text-[15px]', defaultWeight: 'medium' },
    callout: { className: 'text-[14px]', defaultWeight: 'regular' },
    footnote: { className: 'text-[13px]', defaultWeight: 'regular' },
    caption: { className: 'text-[12px]', defaultWeight: 'regular' },
    code: { className: 'text-[14px]', defaultWeight: 'regular' },
  };

  const combinedClassName = twMerge(
    baseStyles,
    secondaryStyles,
    variantStyles[variant].className,
    className,
    'mb-4'
  );

  const fontWeight = weight || variantStyles[variant].defaultWeight;
  const fontFamily = variant === 'code' ? 'Courier' : fontFamilies[fontWeight];

  const style: TextStyle = {
    fontFamily,
  };

  return (
    <RNText className={combinedClassName} style={style}>
      {children}
    </RNText>
  );
};

export default Text;
