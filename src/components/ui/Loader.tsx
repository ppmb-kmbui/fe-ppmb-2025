interface LoaderProps {
  size?: 'xs' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ 
    size='lg' 
}) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className={`${size == "lg" ? "loader w-14 h-14" : "loader-xs w-5 h-5"}`} />
      {/* <text className="text-xl">Loading</text> */}
    </div>
  );
};
