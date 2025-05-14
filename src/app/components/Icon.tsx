interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string; // the ID of the icon in the sprite
}

function Icon({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/assets/icons.svg#${id}`} />
    </svg>
  );
}

export default Icon;