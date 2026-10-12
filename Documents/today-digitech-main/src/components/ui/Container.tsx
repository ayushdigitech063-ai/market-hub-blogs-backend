import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fluid = false,
  style,
  ...props
}) => {
  return (
    <div
      className={`container ${className}`}
      style={{
        maxWidth: fluid ? '100%' : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
